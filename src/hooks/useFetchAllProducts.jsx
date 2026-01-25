import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "./useAuth";

const useFetchAllProducts = () => {
  const { auth } = useAuth();
  const { data: allProducts, isLoading: isProductsLoading } = useQuery({
    queryKey: ["allProducts"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://api.erp.seoulsourcing.com/api/dynamic-field-get",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              app_name: "product",
              model_name: "product",
              fields: ["id", "name", "mrp", "dp"],
              filters: {},
              first: false,
            }),
          },
        );

        const productsJSON = await res.json();

        const productsOptions = productsJSON?.map((product) => ({
          value: product?.id,
          label: product?.name,
          ...product,
        }));

        return productsOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });
  return { allProducts, isProductsLoading };
};

export default useFetchAllProducts;
