import { Flex, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import TextArea from "antd/es/input/TextArea";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import { useQuery } from "@tanstack/react-query";
import TBSImageUpload from "../../Components/Shared/TBSImageUpload/TBSImageUpload";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const AddShop = () => {
  const { auth } = useAuth();
  const [fileList, setFileList] = useState([]);
  const [isAddShopLoading, setIsAddShopLoading] = useState(false);
  const [selectedThana, setSelectedThana] = useState(null);
  const navigate = useNavigate();
  const { data: thanaOptions, isLoading: isThanaLoading } = useQuery({
    queryKey: ["thanaOptions"],
    queryFn: async () => {
      try {
        const thanaRes = await fetch(
          "https://api.erp.seoulsourcing.com/api/global-address",
        );
        const thanaJSON = await thanaRes.json();
        const thanaList = thanaJSON?.thana;
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

  const onSubmitAddShop = async (values) => {
    console.log("Success:", values);
    const payload = {
      ...values,
      district: selectedThana?.city_name,
    };
    const formData = new FormData();
    formData.append("image", fileList[0]);
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      console.log(auth.authToken);
      setIsAddShopLoading(true);
      const response = await fetch(
        "https://api.erp.seoulsourcing.com/api/shop/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.authToken}`,
          },
          body: formData,
        },
      );
      if (!response.ok) {
        setIsAddShopLoading(false);
        throw new Error("Failed to add shop");
      }
      if (response.ok) {
        setIsAddShopLoading(false);
        const data = await response.json();

        console.log(data);
        message.success("Shop added successfully");
        navigate("/shops", { replace: true });
      }
    } catch (error) {
      message.error("Error adding shop");
      console.log("Error creating Shop:", error.message);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-3xl text-center font-bold mb-5">Add Shop</h1>
      <div className="py-10">
        <TBSImageUpload fileList={fileList} setFileList={setFileList} />
      </div>
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
              setSelectedThana(selected);
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
          <TBSButton
            btnType={"submit"}
            text={"Add Shop"}
            style={"w-full"}
            isLoading={isAddShopLoading}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddShop;
