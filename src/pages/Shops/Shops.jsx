import { useQuery } from "@tanstack/react-query";
import { Table, Flex, Space, Tag, Spin } from "antd";
import { FaEdit } from "react-icons/fa";
import { Link, Navigate } from "react-router";

const Shops = () => {
  const { data: allShops, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: async () => {
      try {
        const shopsRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/shop"
        );
        const allShopsJSON = await shopsRes.json();
        const shopOptions = allShopsJSON?.results?.map((shop) => ({
          key: shop?.id,
          ...shop,
        }));
        return shopOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "shop_name",
      key: "shop_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
    {
      title: "District",
      key: "district",
      dataIndex: "district",
    },
    {
      title: "Thana",
      key: "thana_name",
      dataIndex: "thana_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit-shop/${record.key}`}>
            <FaEdit className="cursor-pointer" />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-full! mx-10">
      <h1 className="text-center text-2xl font-bold my-4">Shops</h1>
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={allShops}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default Shops;
