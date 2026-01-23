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
    try {
      //   setLoading(true);
      //   const res = await fetch(
      //     `https://api.erp.seoulsourcing.com/api/shop-order/${orderId}`,
      //     {
      //       method: "PATCH",
      //       headers: {
      //         Authorization: `Bearer ${auth?.authToken}`,
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(payload),
      //     },
      //   );

      //   if (!res.ok) throw new Error();

      message.success("Order updated!");
      //refetchAllOrders();
      //setIsModalOpen(false)
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
