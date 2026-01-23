import { useQuery } from "@tanstack/react-query";
import React from "react";

const useThanaHandler = () => {
  const { data: thanaOptions, isLoading: isThanaLoading } = useQuery({
    queryKey: ["thanaOptions"],
    queryFn: async () => {
      try {
        const thanaRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/global-address",
        );
        const thanaJSON = await thanaRes.json();
        const thanaList = thanaJSON?.thana;
        const thanaOptions = thanaList?.map((thana) => ({
          value: thana?.id,
          label: thana?.name,
          ...thana,
        }));
        return thanaOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });
  return { thanaOptions, isThanaLoading };
};

export default useThanaHandler;
