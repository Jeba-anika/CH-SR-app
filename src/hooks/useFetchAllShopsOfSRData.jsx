import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const useFetchAllShopsOfSRData = () => {
  const { auth } = useAuth();
  const { data: shopOptions, isLoading: isShopOptionsLoading } = useQuery({
    queryKey: ["shopOptions"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const shopRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/sr-shop-list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const shopJSON = await shopRes.json();
        const shopOptions = shopJSON?.results?.map((shop) => ({
          value: shop.id,
          label: shop.shop_name,
          ...shop,
        }));

        return shopOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });
  return { shopOptions, isShopOptionsLoading };
};

export default useFetchAllShopsOfSRData;
