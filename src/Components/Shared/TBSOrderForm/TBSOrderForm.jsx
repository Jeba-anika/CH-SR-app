import { Flex, Form, Radio, Select, ConfigProvider, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useFetchAllShopsOfSRData from "../../../hooks/useFetchAllShopsOfSRData";
import useThanaHandler from "../../../hooks/useThanaHandler";
import TBSFormItemField from "../TBSFormItemField/TBSFormItemField";
import AddProductSection from "../../../pages/CreateOrder/AddProductSection";
import ProductListSection from "../../../pages/CreateOrder/ProductListSection";
import TBSButton from "../TBSButton/TBSButton";
import TextArea from "antd/es/input/TextArea";
import TBSSpin from "../TBSSpin/TBSSpin";

const TBSOrderForm = ({
  mode = "create", // "create" | "edit"
  initialValues = null, // order data (for edit)
  onSubmit, // submit handler
  isSubmitLoading = false,
  setIsInitialValuesLoading,
}) => {
  const [form] = Form.useForm();
  const hasLoadedInitialValues = useRef(false);

  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [deletedProductsList, setDeletedProductsList] = useState([]);

  const { shopOptions, isShopOptionsLoading } = useFetchAllShopsOfSRData();
  const { thanaOptions, isThanaLoading } = useThanaHandler();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const onChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    if (mode !== "edit") return;

    // 🔹 modal closed / switching order → reset
    if (!initialValues) {
      hasLoadedInitialValues.current = false;
      form.resetFields();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedProductsList([]);
      setDeletedProductsList([]);
      setSelectedShopkeeper(null);
      setPaymentMethod("Cash");
      return;
    }

    // 🔹 already hydrated → stop
    if (hasLoadedInitialValues.current) return;

    setIsInitialValuesLoading(true);

    // ---- FORM FIELDS ----
    form.setFieldsValue({
      shopper: initialValues.shopper,
      name: initialValues.name,
      mobile_number: initialValues.mobile_number,
      note: initialValues.note,
    });

    // ---- PRODUCTS ----
    setSelectedProductsList(
      (initialValues.products || []).map((p) => ({
        product: p.product || p.product_id,
        product_id: p.product || p.product_id,
        product_name: p.product_name,
        quantity: Number(p.quantity),
        unit_price: Number(p.unit_price),
        total_price: Number(p.total_price),
        product_discount: Number(p.product_discount || 0),
        id: p.id,
      })),
    );

    // ---- PAYMENT ----
    setPaymentMethod(initialValues.payment_option || "Cash");

    // ---- ADDRESS ----
    setSelectedShopkeeper(initialValues.address || null);

    hasLoadedInitialValues.current = true;
    setIsInitialValuesLoading(false);
  }, [initialValues, mode]); //

  const handleSubmit = (values) => {
    if (!selectedProductsList || selectedProductsList.length === 0) {
      message.error("Please add at least one product to the order");
      return;
    }
    const total_amount = selectedProductsList.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );

    const total_discount_amount = selectedProductsList.reduce(
      (sum, item) => sum + Number(item.product_discount || 0),
      0,
    );
    console.log(selectedProductsList);

    const payload = {
      shopper: values.shopper,
      address: initialValues?.address || 4,
      total_amount,
      total_discount_amount,
      payment_option: paymentMethod,
      products: selectedProductsList,
      note: values?.note || "Unavailable",
    };

    if (mode === "edit") {
      const editPayload = {
        ...payload,
        delete_product_ids: deletedProductsList,
      };
      onSubmit(editPayload);
    } else {
      onSubmit(payload);
    }
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    if ("quantity" in changedValues) {
      const quantity = Number(allValues.quantity || 0);
      const unitPrice = Number(selectedProduct?.dp || 0);
      const discountValue = Number(allValues?.product_discount || 0);

      form.setFieldsValue({
        product_price: Number(unitPrice * quantity),
        total_price: Number(quantity * unitPrice - discountValue),
      });
    }

    if ("product_discount" in changedValues) {
      const discount = Number(allValues.product_discount || 0);
      const productPrice = Number(allValues.product_price || 0);

      form.setFieldsValue({
        total_price: Number(productPrice - discount),
      });
    }
  };

  if (isShopOptionsLoading || isThanaLoading) {
    return (
      <div className="h-screen w-full text-center">
        <TBSSpin />
      </div>
    );
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      onValuesChange={handleFormValuesChange}
    >
      {/* SHOP */}
      <Form.Item label="Shop Name" name="shopper" required>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
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
      {mode === "create" && selectedShopkeeper && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="col-span-2">
            Thana: {selectedShopkeeper?.thana_name}
          </div>
          <div className="col-span-2">
            District: {selectedShopkeeper?.district}
          </div>
        </div>
      )}
      {mode === "edit" && initialValues && (
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

      <div className="my-4">
        <Form.Item layout="vertical" label={"Remarks"} name={"note"}>
          <TextArea className="border! border-[#F9CF2F]!" rows={4} />
        </Form.Item>
      </div>

      {/* --------------------------------------- */}
      <div className="my-4">
        <div className="bg-[#F9CF2F]  mb-2 w-fit p-2 rounded-xl">
          Payment Option
        </div>
        <ConfigProvider
          theme={{
            token: {
              // This changes the radio button circle and border to yellow when selected
              colorPrimary: "#F9CF2F",
              // This ensures the hover state is also yellow
              colorPrimaryHover: "#eab308",
            },
          }}
        >
          <Radio.Group
            onChange={onChangePaymentMethod}
            value={paymentMethod}
            options={[
              {
                value: "Cash",
                className: "option-1",
                label: <div>Cash</div>,
              },
              {
                value: "Partial Payment",
                className: "option-2",
                label: <div>Partial Payment</div>,
              },
              {
                value: "After Sale",
                className: "option-3",
                label: <div>After Sale</div>,
              },
            ]}
          />
        </ConfigProvider>
      </div>

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
