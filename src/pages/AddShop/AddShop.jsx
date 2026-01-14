import { Flex, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import TextArea from "antd/es/input/TextArea";

const AddShop = () => {
  const thanaList = [
    { id: 1, name: "Shop A", address: "123 Street" },
    { id: 2, name: "Shop B", address: "456 Avenue" },
    { id: 3, name: "Shop C", address: "789 Road" },
  ];

  const thanaOptions = thanaList.map((thana) => ({
    value: thana.id,
    label: thana.name,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/global-address"
        );
        // const allShopsJSON = await shopsRes.json();
        // const shopOptions = allShopsJSON?.map((shop) => ({
        //   value: shop.shop_id,
        //   label: shop.shop_name,
        //   ...shop,
        // }));
        // setAllShops(shopOptions);

        const productsRes = await fetch("products.json");
        const products = await productsRes.json();
        console.log(products);
        const productOptions = products?.map((product) => ({
          value: product.product_id,
          label: product.product_name,
          ...product,
        }));
        // setAllProducts(productOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-10">
      <Form name="layout-multiple-horizontal" layout="horizontal">
        <TBSFormItemField
          label={"Shop Name"}
          name={"shop_name"}
          placeholder={"Enter Shop Name"}
          isRequired={true}
        />
        <TBSFormItemField
          label={"Customer Name"}
          name={"name"}
          placeholder={"Enter Name"}
          isRequired={true}
        />
        <TBSFormItemField
          label={"Phone Number"}
          name={"mobile_number"}
          placeholder={"Enter Phone Number"}
          isRequired={true}
          type={"number"}
        />
        <TBSFormItemField
          label={"Email"}
          name={"email"}
          placeholder={"Enter Email"}
          isRequired={false}
          type={"email"}
        />
        <TBSFormItemField
          label={"Trade License Number"}
          name={"trade_license"}
          placeholder={"Enter Trade License Number"}
          isRequired={false}
          type={"number"}
        />
        <Form.Item layout="vertical" label="Select Thana" required={true}>
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Search and select thana"
            onChange={(value) => {
              const selected = thanaList.find((s) => s.id === value);
              console.log("Selected thana:", selected);
            }}
            options={thanaOptions}
            className="border! border-[#F9CF2F]!"
          />
        </Form.Item>
        <TBSFormItemField
          label={"District"}
          name={"district"}
          placeholder={"Enter District"}
          isRequired={false}
        />
        <Form.Item
          layout="vertical"
          label={"Address Description"}
          name={"address_description"}
          rules={[{ required: true }]}
        >
          <TextArea className="border! border-[#F9CF2F]!" rows={4} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddShop;
