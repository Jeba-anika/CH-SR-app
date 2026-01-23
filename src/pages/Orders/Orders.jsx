import { useQuery } from "@tanstack/react-query";
import { Table, Flex, Space, Tag, Spin, Image } from "antd";
import { FaEdit } from "react-icons/fa";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import TBSSpin from "../../Components/Shared/TBSSpin/TBSSpin";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditShop from "../EditShop/EditShop";

const Orders = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);

  const {
    data: allOrders,
    isLoading,
    refetch: refetchAllOrders,
  } = useQuery({
    queryKey: ["orders"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://api.erp.seoulsourcing.com/api/per-sr-order-list/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const orders = await res.json();
        console.log(orders);

        const orderList = orders?.results?.map((order) => ({
          key: order?.id,
          ...order,
        }));
        return orderList;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "shop_name",
      key: "shop_name",
      render: (text) => <>{text}</>,
    },
    {
      title: "Total Qty",
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    {
      title: "Total Discount",
      dataIndex: "total_discount_amount",
      key: "total_discount_amount",
    },
    {
      title: "Total Amount",
      key: "total_amount",
      dataIndex: "total_amount",
    },
    {
      title: "Payment Method",
      key: "payment_option",
      dataIndex: "payment_option",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              showModal();
              setSelectedShopId(record.id);
            }}
          >
            <FaEdit className="cursor-pointer" />
          </button>
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
        <h1 className="text-3xl font-bold">Orders</h1>

        <Link to="/create-order">
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
            Add Order
          </button>
        </Link>
      </div>
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={allOrders}
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* {EDIT SHOP} */}
      <EditShop
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedShopId={selectedShopId}
        refetchAllShops={refetchAllOrders}
      />
    </div>
  );
};

export default Orders;
