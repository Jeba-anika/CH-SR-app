import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "./useAuth";

const useFetchShopDataHandler = ({ shopId, isEdit, setFileList }) => {
  const { auth } = useAuth();

  const {
    data: shopData,
    isLoading: isShopLoading,
    refetch: refetchShop,
  } = useQuery({
    queryKey: ["shopData", shopId],
    enabled: isEdit,
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://api.erp.seoulsourcing.com/api/shop/${shopId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const shopJSON = await res.json();
        console.log(shopJSON);
        if (res.status === 200) {
          if (shopJSON?.shop_image) {
            setFileList([
              {
                uid: "-1",
                name: "shop_image",
                status: "done",
                originFileObj: shopJSON?.shop_image,
              },
            ]);
          }
        }
        return shopJSON;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });
  return { shopData, isShopLoading, refetchShop };
};

export default useFetchShopDataHandler;
