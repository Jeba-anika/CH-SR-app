import { useQuery } from "@tanstack/react-query";
import { Table, Flex, Space, Tag, Spin } from "antd";
import { FaEdit } from "react-icons/fa";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import TBSSpin from "../../Components/Shared/TBSSpin/TBSSpin";
import { PlusOutlined } from "@ant-design/icons";

const Shops = () => {
  const { auth } = useAuth();
  const { data: allShops, isLoading } = useQuery({
    queryKey: ["shops"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const shopsRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/sr-shop-list/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TBSSpin />
      </div>
    );
  }

  return (
    <div className="max-w-full! mx-10">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold">Shops</h1>

        <Link to="/add-shop">
          <button
            className="
        flex items-center gap-2
        px-3 py-2
        rounded
        bg-[#F9CF2F]
        text-black
        font-medium
        shadow
        hover:shadow-md
        hover:opacity-90
        transition-all
      "
          >
            <PlusOutlined />
            Add Shop
          </button>
        </Link>
      </div>
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
