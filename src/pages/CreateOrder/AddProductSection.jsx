import { Form, Select } from "antd";
import React, { useState } from "react";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import useFetchAllProducts from "../../hooks/useFetchAllProducts";

const PRODUCT_FIELDS = [
  "quantity",
  "product_discount",
  "total_price",
  "product_price",
  "product",
];

const AddProductSection = ({
  setSelectedProduct,
  selectedProduct,
  setSelectedProductsList,
  form,
  selectedProductsList,
}) => {
  const { allProducts } = useFetchAllProducts();
  const [isFieldRequired, setIsFieldRequired] = useState(false);

  const onAddItemBtnClick = () => {
    console.log(selectedProductsList);
    const newItem = {
      product_name: selectedProduct.name,
      product: selectedProduct.value,
      quantity: Number(form.getFieldValue("quantity")),
      product_discount: Number(form.getFieldValue("product_discount")),
      total_price: Number(form.getFieldValue("total_price")),
      unit_price: Number(selectedProduct?.dp),
    };
    console.log(newItem);
    setSelectedProductsList((prev) => [...prev, newItem]);

    setSelectedProduct(null);
    form.resetFields(PRODUCT_FIELDS);
    setIsFieldRequired(false);
  };

  return (
    <div>
      <div>
        {/* Order Here */}
        <h3 className="text-center text-2xl">Order Here</h3>
        <Form.Item
          layout="vertical"
          label="Product name"
          name={"product"}
          required={true}
        >
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Search and select product"
            onChange={(value) => {
              const selected = allProducts.find((s) => s.id === value);
              setSelectedProduct(selected);
              form.setFieldsValue({
                quantity: 1,
                product_price: Number(selected?.dp) || 0,
                total_price: Number(selected?.dp) || 0,
                product_discount: 0,
              });
              setIsFieldRequired(true);
            }}
            options={allProducts}
            className="border! border-[#F9CF2F]!"
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="">
            <TBSFormItemField
              type={"number"}
              isRequired={isFieldRequired}
              name={"quantity"}
              isDisabled={false}
              label={"Quantity"}
            />
          </div>
          <div className="">
            <TBSFormItemField
              type={"text"}
              label={"Price"}
              name={"product_price"}
              isDisabled={true}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="w-1/2">
          <TBSFormItemField
            type={"number"}
            label={"Discount"}
            name={"product_discount"}
            isDisabled={false}
          />
        </div>
        <div className="w-1/2">
          <TBSFormItemField
            type={"number"}
            label={"Total Amount"}
            name={"total_price"}
            isDisabled={true}
          />
        </div>
      </div>
      <TBSButton
        onClickFn={() => onAddItemBtnClick()}
        text={"Add Item"}
        style={"w-full "}
        isDisabled={!selectedProduct}
      />
    </div>
  );
};

export default AddProductSection;
