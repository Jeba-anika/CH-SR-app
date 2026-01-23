import { Table } from "antd";
import React from "react";
import { MdDelete } from "react-icons/md";

const ProductListSection = ({ onDeleteItems, selectedProductsList }) => {
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
    {
      title: "Action",
      key: "action",
      render: (_) => {
        console.log(_);
        return (
          <MdDelete
            onClick={() => onDeleteItems(_.product_id)}
            className="cursor-pointer text-red-500"
          />
        );
      },
    },
  ];
  return (
    <div className="mt-10">
      <Table
        bordered
        columns={columns}
        dataSource={selectedProductsList}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ProductListSection;
