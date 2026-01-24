import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useFetchOrderById from "../../hooks/useFetchOrderById";
import { message } from "antd";
import TBSOrderForm from "../../Components/Shared/TBSOrderForm/TBSOrderForm";
import TBSModal from "../../Components/Shared/TBSModal/TBSModal";
import TBSSpin from "../../Components/Shared/TBSSpin/TBSSpin";

const EditOrder = ({
  orderId,
  refetchAllOrders,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const { orderDetails, isOrderDetailsLoading } = useFetchOrderById({
    orderId,
  });
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateOrder = async (payload) => {
    console.log(payload);
    const products = payload?.products.map((p) => {
      return { ...p, shop_order: orderId };
    });
    const editOrderPayload = {
      id: orderId,
      products,
      total_amount: payload?.total_amount,
      total_discount_amount: payload?.total_discount_amount,
      payment_option: payload?.payment_option,
      note: payload?.note,
      total_quantity: payload?.total_quantity,
      shopper: payload?.address?.shopper,
      address: payload?.address?.id,
      delete_product_ids: payload?.delete_product_ids,
    };
    console.log(editOrderPayload);
    console.log(JSON.stringify(editOrderPayload));
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.erp.seoulsourcing.com/api/shop-order/${orderId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editOrderPayload),
        },
      );

      if (!res.ok) throw new Error();

      message.success("Order updated!");
      refetchAllOrders();
      setIsModalOpen(false);
    } catch {
      message.error("Failed to update order");
    } finally {
      setLoading(false);
    }
  };
  const editOrderBody = (
    <>
      {isOrderDetailsLoading ? (
        <TBSSpin />
      ) : (
        <TBSOrderForm
          mode="edit"
          initialValues={orderDetails}
          onSubmit={updateOrder}
          isSubmitLoading={loading}
        />
      )}
    </>
  );

  return (
    <TBSModal
      title="Edit Order"
      isModalOpen={isModalOpen}
      body={editOrderBody}
      handleCancel={handleCancel}
    />
  );
};

export default EditOrder;
