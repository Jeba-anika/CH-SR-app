import { useState } from "react";

import { message } from "antd";

import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router";
import TBSOrderForm from "../../Components/Shared/TBSOrderForm/TBSOrderForm";

const CreateOrder = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createOrder = async (payload) => {
    console.log(payload);
    console.log(JSON.stringify(payload));
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.erp.seoulsourcing.com/api/shop-order/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error();

      message.success(data?.message || "Order created!");
      navigate("/orders");
    } catch {
      message.error("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4">
      <TBSOrderForm onSubmit={createOrder} isSubmitLoading={loading} />
    </div>
  );
};

export default CreateOrder;
