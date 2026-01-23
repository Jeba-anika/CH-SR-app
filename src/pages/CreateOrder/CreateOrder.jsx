import { useState } from "react";
import TBSInput from "../../Components/Shared/TBSInput/TBSInput";

import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import TBSDropdownSelect from "../../Components/Shared/TBSDropdownSelect/TBSDropdownSelect";
import { MdDelete } from "react-icons/md";
import { Form, message, Select, Space, Table } from "antd";

import { useAuth } from "../../hooks/useAuth";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import AddProductSection from "./AddProductSection";
import useFetchAllShopsOfSRData from "../../hooks/useFetchAllShopsOfSRData";

import useThanaHandler from "../../hooks/useThanaHandler";
import ProductListSection from "./ProductListSection";
import { useNavigate } from "react-router";

const CreateOrder = () => {
  const { auth } = useAuth();
  const [form] = Form.useForm();
  const { shopOptions } = useFetchAllShopsOfSRData();
  const { thanaOptions } = useThanaHandler();

  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const onDeleteItems = (productId) => {
    const updatedList = selectedProductsList.filter(
      (product) => product.product_id !== productId,
    );
    console.log(updatedList);

    setSelectedProductsList(updatedList);
  };

  const onCreateOrder = async (data) => {
    console.log(data);
    const total_amount = selectedProductsList.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );
    const total_discount_amount = selectedProductsList.reduce(
      (sum, item) => sum + Number(item.product_discount || 0),
      0,
    );
    const products = selectedProductsList.map((product) => ({
      product: product.product,
      quantity: product?.quantity,
      unit_price: product?.unit_price,
      total_price: Number(product?.total_price),
      product_discount: Number(product?.product_discount),
    }));
    const orderPayload = {
      shopper: data?.shopper,
      //address: selectedShopkeeper?.thana,
      address: 4,
      total_amount,
      total_discount_amount,
      payment_option: "Cash",
      products,
      note: "Unavailable",
    };
    console.log(orderPayload);
    try {
      setIsSubmitLoading(true);
      const res = await fetch(
        "https://api.erp.seoulsourcing.com/api/shop-order/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        },
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status === 201 || res.ok) {
        setIsSubmitLoading(false);
        message.success(
          `${data?.message ? data.message : "Order Created Successfully!"}`,
        );
        navigate("/orders");
      } else {
        setIsSubmitLoading(false);
        throw new Error("Error creating Order!", data);
      }
    } catch (error) {
      console.log(error.message);
      message.error("Error creating Order!");
    }
  };

  return (
    <div className="m-10">
      <Form
        form={form}
        name="login"
        onFinish={onCreateOrder}
        autoComplete="off"
        scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
        onValuesChange={(changedValues, allValues) => {
          console.log(allValues, changedValues);
          console.log(selectedProduct);
          if ("quantity" in changedValues) {
            const quantity = Number(allValues.quantity || 0);
            const unitPrice = selectedProduct?.dp || 0;
            const discountValue = Number(allValues?.product_discount);

            form.setFieldsValue({
              product_price: unitPrice * quantity || 0,
              total_price: (
                quantity * unitPrice -
                (discountValue || 0)
              ).toFixed(2),
            });
          }
          if ("product_discount" in changedValues) {
            const discount = Number(allValues.product_discount || 0);
            const discountedPrice = allValues.product_price - discount;
            console.log(discount);
            form.setFieldsValue({
              total_price: discountedPrice,
            });
          }
        }}
      >
        <Form.Item
          layout="vertical"
          label="Shop Name"
          name={"shopper"}
          required={true}
        >
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Search and select shop"
            onChange={(value) => {
              const selected = shopOptions.find((s) => s.id === value);

              const district = thanaOptions?.find(
                (thana) => thana.id === selected?.thana,
              )?.city_name;
              const shopDetails = { ...selected, district };
              setSelectedShopkeeper(shopDetails);
              console.log(shopDetails);
              form.setFieldsValue({
                name: selected?.name,
                mobile_number: selected?.mobile_number,
              });
            }}
            options={shopOptions}
            className="border! border-[#F9CF2F]!"
          />
        </Form.Item>
        <TBSFormItemField
          type={"text"}
          label={"Customer Name"}
          name={"name"}
          isDisabled={true}
          placeholder={"Customer Name"}
        />
        <TBSFormItemField
          type={"text"}
          label={"Mobile Number"}
          name={"mobile_number"}
          isDisabled={true}
          placeholder={"Mobile Number"}
        />
        {selectedShopkeeper && (
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2">
              Thana: {selectedShopkeeper?.thana_name}
            </div>
            <div className="col-span-2">
              District: {selectedShopkeeper?.district}
            </div>
          </div>
        )}

        <AddProductSection
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setSelectedProductsList={setSelectedProductsList}
          form={form}
        />
        <ProductListSection
          onDeleteItems={onDeleteItems}
          selectedProductsList={selectedProductsList}
        />
        <TBSButton
          text={"Create Order"}
          btnType={"submit"}
          style={"w-full"}
          isLoading={isSubmitLoading}
        />
      </Form>
    </div>
  );
};

export default CreateOrder;
