import React from "react";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useFetchOrderById = ({ orderId }) => {
  const { auth } = useAuth();
  const { data: orderDetails, isLoading: isOrderDetailsLoading } = useQuery({
    queryKey: ["orderDetails"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://api.erp.seoulsourcing.com/api/shop-order/${orderId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const data = await res.json();
        const orderDetails = {
          name: data.address.name,
          mobile_number: data.address.phone,
          thana: data.address.thana,
          city: data.address.city,
          ...data,
        };

        return orderDetails;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });
  return { orderDetails, isOrderDetailsLoading };
};

export default useFetchOrderById;
