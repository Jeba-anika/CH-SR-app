import { Flex, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import TextArea from "antd/es/input/TextArea";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import { useQuery } from "@tanstack/react-query";

const AddShop = () => {
  const { data: thanaOptions, isLoading: isThanaLoading } = useQuery({
    queryKey: ["thanaOptions"],
    queryFn: async () => {
      try {
        const thanaRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/global-address"
        );
        const thanaJSON = await thanaRes.json();
        const thanaList = thanaJSON?.city;
        const thanaOptions = thanaList?.map((thana) => ({
          value: thana.id,
          label: thana.name,
          ...thana,
        }));
        return thanaOptions;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  });

  const onSubmitAddShop = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="m-10">
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        onFinish={onSubmitAddShop}
      >
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
        <Form.Item
          layout="vertical"
          label="Select Thana"
          name={"thana"}
          required={true}
        >
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Search and select thana"
            onChange={(value) => {
              const selected = thanaOptions.find((s) => s.id === value);
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
        <Form.Item label={null}>
          <TBSButton btnType={"submit"} text={"Add Shop"} style={"w-full"} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddShop;
