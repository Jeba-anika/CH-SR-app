import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { message } from "antd";
import TBSOrderForm from "../../Components/Shared/TBSOrderForm/TBSOrderForm";
import TBSModal from "../../Components/Shared/TBSModal/TBSModal";
import TBSSpin from "../../Components/Shared/TBSSpin/TBSSpin";

const EditOrder = ({
  orderId,
  refetchAllOrders,
  isModalOpen,
  setIsModalOpen,
  selectedOrderDetails,
}) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isInitialValuesLoading, setIsInitialValuesLoading] = useState(false);

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
      {!selectedOrderDetails &&
      !Object.keys(selectedOrderDetails).length > 0 &&
      isInitialValuesLoading ? (
        <TBSSpin />
      ) : (
        <TBSOrderForm
          key={orderId}
          mode="edit"
          initialValues={selectedOrderDetails}
          onSubmit={updateOrder}
          isSubmitLoading={loading}
          setIsInitialValuesLoading={setIsInitialValuesLoading}
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
