import { useEffect, useState } from "react";
import TBSInput from "../../Components/Shared/TBSInput/TBSInput";
import { useForm } from "react-hook-form";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import TBSDropdownSelect from "../../Components/Shared/TBSDropdownSelect/TBSDropdownSelect";
import { MdDelete } from "react-icons/md";
import { Form, Select, Space, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";

const PRODUCT_FIELDS = [
  "quantity",
  "discount",
  "total_price",
  "amount",
  "product_name",
];
const CreateOrder = () => {
  const { auth } = useAuth();
  const [form] = Form.useForm();

  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedProductsList, setSelectedProductsList] = useState([]);

  const { data: shopOptions, isLoading: isShopOptionsLoading } = useQuery({
    queryKey: ["shopOptions"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const shopRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/sr-shop-list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const shopJSON = await shopRes.json();
        const shopOptions = shopJSON?.results?.map((shop) => ({
          value: shop.id,
          label: shop.shop_name,
          ...shop,
        }));

        return shopOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  const { data: allProducts, isLoading: isProductsLoading } = useQuery({
    queryKey: ["allProducts"],
    enabled: !!auth?.authToken,
    queryFn: async () => {
      try {
        const shopRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth?.authToken}`,
            },
          },
        );
        const productsJSON = await shopRes.json();
        console.log(productsJSON);
        const productsOptions = productsJSON?.results.map((product) => ({
          value: product?.id,
          label: product?.name,
          ...product,
        }));

        return productsOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  const onAddItemBtnClick = () => {
    const newItem = {
      ...selectedProduct,
      quantity: form.getFieldValue("quantity"),
      discount: form.getFieldValue("discount"),
      total_amount: form.getFieldValue("amount"),
      unit_price: selectedProduct?.price,
    };
    setSelectedProductsList((prev) => [...prev, newItem]);

    setSelectedProduct(null);
    form.resetFields(PRODUCT_FIELDS);
  };
  const onDeleteItems = (productId) => {
    const updatedList = selectedProductsList.filter(
      (product) => product.product_id !== productId,
    );
    console.log(updatedList);

    setSelectedProductsList(updatedList);
  };
  const onCreateOrder = (data) => {
    console.log(data);
    console.log(selectedProductsList);
    const products = selectedProductsList.map((product) => ({
      product: product.product_id,
      quantity: product?.quantity,
      unit_price: product?.price,
      total_price: product?.total_amount,
      product_discount: product?.discount,
    }));
    const orderPayload = {
      shopper: data?.shopper,
      address: selectedShopkeeper?.thana,
      total_amount: 0,
      total_discount_amount: 0,
      payment_option: "Cash",
      products,
    };
  };

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
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Price",
      key: "total_amount",
      dataIndex: "total_amount",
    },
    {
      title: "Action",
      key: "action",
      render: (_) => {
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
    <div className="m-10">
      <Form
        form={form}
        name="login"
        onFinish={onCreateOrder}
        autoComplete="off"
        onValuesChange={(changedValues, allValues) => {
          if ("quantity" in changedValues) {
            const quantity = Number(allValues.quantity || 0);
            const unitPrice = selectedProduct?.price || 0;

            form.setFieldsValue({
              total_price: (quantity * unitPrice).toFixed(2),
              amount: (
                quantity * unitPrice -
                (allValues.discount || 0)
              ).toFixed(2),
            });
          }
          if ("discount" in changedValues) {
            const discount = Number(allValues.discount || 0);
            const discountedPrice = allValues.total_price - discount;
            form.setFieldsValue({
              amount: discountedPrice,
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
              setSelectedShopkeeper(selected);
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
            <div className="col-span-1">
              Thana: {selectedShopkeeper?.thana_name}
            </div>
          </div>
        )}
        <div>
          {/* Order Here */}
          <h3 className="text-center text-2xl">Order Here</h3>
          <div className="grid grid-cols-5 gap-4 w-full">
            <div className="col-span-3">
              <Form.Item
                layout="vertical"
                label="Product name"
                name={"product_name"}
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
                      total_price: selected?.price || 0,
                      amount: selected?.price || 0,
                      discount: 0,
                    });
                  }}
                  options={allProducts}
                  className="border! border-[#F9CF2F]!"
                />
              </Form.Item>
            </div>
            <div className="">
              <TBSFormItemField
                type={"number"}
                label={
                  <>
                    <div className="text-red-600">* </div>Quantity
                  </>
                }
                name={"quantity"}
                isDisabled={false}
              />
            </div>
            <div className="">
              <TBSFormItemField
                type={"text"}
                label={"Price"}
                name={"total_price"}
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
              name={"discount"}
              isDisabled={false}
            />
          </div>
          <div className="w-1/2">
            <TBSFormItemField
              type={"number"}
              label={"Total Amount"}
              name={"amount"}
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
        <div className="mt-10">
          <Table
            bordered
            columns={columns}
            dataSource={selectedProductsList}
            scroll={{ x: "max-content" }}
          />
        </div>

        <TBSButton
          onClickFn={() => onCreateOrder()}
          text={"Create Order"}
          btnType={"submit"}
          style={"w-full"}
        />
      </Form>
    </div>
  );
};

export default CreateOrder;
