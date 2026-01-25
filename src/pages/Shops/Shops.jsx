import { useQuery } from "@tanstack/react-query";
import { Table, Flex, Space, Tag, Spin, Image } from "antd";
import { FaEdit } from "react-icons/fa";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import TBSSpin from "../../Components/Shared/TBSSpin/TBSSpin";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditShop from "../EditShop/EditShop";
import useThanaHandler from "../../hooks/useThanaHandler";

const Shops = () => {
  const { auth } = useAuth();
  const { thanaOptions, isThanaLoading } = useThanaHandler();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShop, setSelectedShop] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: allShops,
    isLoading,
    refetch: refetchAllShops,
  } = useQuery({
    queryKey: ["shops", currentPage, pageSize, thanaOptions],
    keepPreviousData: true,
    enabled: !!auth?.authToken && !!thanaOptions?.length,

    queryFn: async () => {
      try {
        const shopsRes = await fetch(
          `https://api.erp.seoulsourcing.com/api/sr-shop-list/?page=${currentPage}&page_size=${pageSize}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const allShopsJSON = await shopsRes.json();
        console.log(allShopsJSON);
        console.log(thanaOptions);
        const shopOptions = allShopsJSON?.results?.map((shop) => ({
          key: shop?.id,
          ...shop,
          district: thanaOptions.find((t) => t.id === shop.thana)?.city_name,
        }));
        console.log(shopOptions);
        return { ...allShopsJSON, results: shopOptions };
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
      title: "Image",
      dataIndex: "shop_image",
      key: "shop_image",
      width: 80,
      render: (image) => (
        <Image
          width={50}
          height={50}
          src={image || "/placeholder-image.png"}
          alt="Shop"
          style={{ objectFit: "cover", borderRadius: "4px" }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          preview={{
            mask: "Preview",
          }}
        />
      ),
    },
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
          <button
            onClick={() => {
              setSelectedShop(record);
              setSelectedShopId(record.id);

              showModal();
            }}
          >
            <FaEdit className="cursor-pointer" />
          </button>
        </Space>
      ),
    },
  ];
  if (isThanaLoading) {
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
          loading={isLoading}
          bordered
          columns={columns}
          dataSource={allShops?.results}
          scroll={{ x: "max-content" }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: allShops?.count || 0,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} orders`,
            onChange: (newPage, newPageSize) => {
              setCurrentPage(newPage);
              setPageSize(newPageSize);
            },
          }}
        />
      </div>

      {/* {EDIT SHOP} */}
      <EditShop
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedShopId={selectedShopId}
        refetchAllShops={refetchAllShops}
        selectedShop={selectedShop}
      />
    </div>
  );
};

export default Shops;
