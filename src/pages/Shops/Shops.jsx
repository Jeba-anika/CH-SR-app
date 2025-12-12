import React, { useEffect, useState } from "react";

const Shops = () => {
  const [allShops, setAllShops] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopsRes = await fetch("shops.json");
        const allShopsJSON = await shopsRes.json();
        const shopOptions = allShopsJSON?.map((shop) => ({
          value: shop.shop_id,
          label: shop.shop_name,
          ...shop,
        }));
        setAllShops(shopOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Shop Name</th>
              <th>Customer Name</th>
              <th>District</th>
              <th>Thana</th>
            </tr>
          </thead>
          <tbody>
            {allShops?.map((shop, index) => (
              <tr key={shop?.shop_id}>
                <th>{index + 1}</th>
                <td>{shop.shop_name}</td>
                <td>{shop.customer_name}</td>
                <td>{shop.district}</td>
                <td>{shop.thana}</td>
                <td className="text-center  flex justify-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shops;
