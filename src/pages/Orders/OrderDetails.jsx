import { Table } from "antd";
import React from "react";
import TBSModal from "../../Components/Shared/TBSModal/TBSModal";

const OrderDetails = ({ orderDetails, isModalOpen, setIsModalOpen }) => {
  const columns = [
    {
      title: "SL No",
      dataIndex: "sl_no",
      key: "sl_no",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Item Name",
      dataIndex: "product_name",
      key: "name",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      key: "unit_price",
      dataIndex: "unit_price",
    },
    {
      title: "Discount",
      key: "product_discount",
      dataIndex: "product_discount",
    },
    {
      title: "Price",
      key: "total_price",
      dataIndex: "total_price",
    },
  ];
  const orderDetailsBody = (
    <>
      <div>Shop Name: {orderDetails.shop_name}</div>
      <div>Customer Name: {orderDetails.shopper_name}</div>
      <div>Total Quantity: {orderDetails?.total_quantity}</div>
      <div>Total Discount: {orderDetails?.total_discount_amount}</div>
      <div>Total Amount: {orderDetails.total_amount}</div>
      <div className="mt-10">
        <Table
          bordered
          columns={columns}
          dataSource={orderDetails?.products}
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <TBSModal
        title="Order Details"
        isModalOpen={isModalOpen}
        body={orderDetailsBody}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default OrderDetails;
