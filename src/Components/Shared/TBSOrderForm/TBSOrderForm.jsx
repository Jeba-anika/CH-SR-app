import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import useFetchAllShopsOfSRData from "../../../hooks/useFetchAllShopsOfSRData";
import useThanaHandler from "../../../hooks/useThanaHandler";
import TBSFormItemField from "../TBSFormItemField/TBSFormItemField";
import AddProductSection from "../../../pages/CreateOrder/AddProductSection";
import ProductListSection from "../../../pages/CreateOrder/ProductListSection";
import TBSButton from "../TBSButton/TBSButton";

const TBSOrderForm = ({
  mode = "create", // "create" | "edit"
  initialValues = null, // order data (for edit)
  onSubmit, // submit handler
  isSubmitLoading = false,
}) => {
  const [form] = Form.useForm();

  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [deletedProductsList, setDeletedProductsList] = useState([]);

  const { shopOptions } = useFetchAllShopsOfSRData();
  const { thanaOptions } = useThanaHandler();
  console.log(initialValues);

  // 🧠 Prefill in edit mode
  useEffect(() => {
    if (!initialValues) return;
    form.setFieldsValue({
      shopper: initialValues.shopper,
      name: initialValues.name,
      mobile_number: initialValues.mobile_number,
    });

    if (initialValues.products && Array.isArray(initialValues.products)) {
      setSelectedProductsList(initialValues.products);
    }
    if (initialValues.address) {
      setSelectedShopkeeper(initialValues.address);
    }
  }, [initialValues]);

  const handleSubmit = (values) => {
    const total_amount = selectedProductsList.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );

    const total_discount_amount = selectedProductsList.reduce(
      (sum, item) => sum + Number(item.product_discount || 0),
      0,
    );
    console.log(selectedProductsList);
    // const products = selectedProductsList.map((p) => ({
    //   product: p.product,
    //   quantity: p.quantity,
    //   unit_price: p.unit_price,
    //   total_price: Number(p.total_price),
    //   product_discount: Number(p.product_discount),
    // }));

    const payload = {
      shopper: values.shopper,
      address: initialValues?.address || 4,
      total_amount,
      total_discount_amount,
      payment_option: "Cash",
      products: selectedProductsList,
      note: "Unavailable",
      delete_product_ids: deletedProductsList,
    };

    onSubmit(payload);
  };
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      onValuesChange={(changedValues, allValues) => {
        console.log(allValues, changedValues);
        console.log(selectedProduct);
        if ("quantity" in changedValues) {
          const quantity = Number(allValues.quantity || 0);
          const unitPrice = selectedProduct?.dp || 0;
          const discountValue = Number(allValues?.product_discount);

          form.setFieldsValue({
            product_price: unitPrice * quantity || 0,
            total_price: (quantity * unitPrice - (discountValue || 0)).toFixed(
              2,
            ),
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
      {/* SHOP */}
      <Form.Item label="Shop Name" name="shopper" required>
        <Select
          placeholder={"Search and select shop"}
          options={shopOptions}
          showSearch
          onChange={(value) => {
            const selected = shopOptions.find((s) => s.id === value);
            const district = thanaOptions.find(
              (t) => t.id === selected?.thana,
            )?.city_name;

            setSelectedShopkeeper({ ...selected, district });

            form.setFieldsValue({
              name: selected?.name,
              mobile_number: selected?.mobile_number,
            });
          }}
        />
      </Form.Item>

      <TBSFormItemField
        name="name"
        label="Customer Name"
        isDisabled
        placeholder={"Customer Name"}
      />
      <TBSFormItemField
        name="mobile_number"
        label="Mobile Number"
        isDisabled
        placeholder={"Mobile Number"}
      />
      {selectedShopkeeper && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="col-span-2">
            Thana: {selectedShopkeeper?.thana_name}
          </div>
          <div className="col-span-2">
            District: {selectedShopkeeper?.district}
          </div>
        </div>
      )}
      {initialValues && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="col-span-2">
            Thana: {initialValues?.address?.thana}
          </div>
          <div className="col-span-2">
            District: {initialValues?.address?.city}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <AddProductSection
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setSelectedProductsList={setSelectedProductsList}
        form={form}
        selectedProductsList={selectedProductsList}
      />

      <ProductListSection
        selectedProductsList={selectedProductsList}
        onDeleteItems={(record) => {
          if (mode === "edit") {
            if ("id" in record) {
              setDeletedProductsList((prev) => [...prev, record.id]);
            }
          }
          console.log(record);
          console.log(selectedProductsList);
          setSelectedProductsList((list) =>
            list.filter((p) => p.product !== record?.product),
          );
        }}
      />

      <TBSButton
        text={mode === "edit" ? "Update Order" : "Create Order"}
        btnType="submit"
        isLoading={isSubmitLoading}
        style="w-full"
      />
    </Form>
  );
};

export default TBSOrderForm;
