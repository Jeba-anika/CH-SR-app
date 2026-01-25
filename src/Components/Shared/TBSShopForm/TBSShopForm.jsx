import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";

import TBSImageUpload from "../TBSImageUpload/TBSImageUpload";
import TBSFormItemField from "../TBSFormItemField/TBSFormItemField";
import TextArea from "antd/es/input/TextArea";
import TBSButton from "../TBSButton/TBSButton";
import useThanaHandler from "../../../hooks/useThanaHandler";
import { useNavigate } from "react-router";

const TBSShopForm = ({
  shopId,
  shopData,
  fileList,
  setFileList,
  selectedThana,
  setSelectedThana,
  isSubmitLoading,
  setIsSubmitLoading,
  refetchAllShops,
  setIsModalOpen,
}) => {
  const { auth } = useAuth();
  const isEdit = Boolean(shopId);
  const [form] = Form.useForm();
  const { thanaOptions } = useThanaHandler();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      shop_name: shopData?.shop_name,
      name: shopData?.name,
      mobile_number: shopData?.mobile_number,
      email: shopData?.email,
      trade_license: shopData?.trade_license,
      thana: shopData?.thana,
      district: thanaOptions.find((t) => t.id === shopData?.thana)?.city_name,
      address_description: shopData?.address_description,
    });
  }, [shopData, shopId, thanaOptions]);

  const onSubmitHandler = async (values) => {
    console.log("Success:", values);
    const payload = {
      ...values,
      district: selectedThana?.city_name,
    };
    console.log(payload);

    const formData = new FormData();

    // Handle image upload - SINGLE PLACE ONLY
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Check if it's a new upload (has originFileObj)
      if (file.originFileObj) {
        console.log("Appending new image");
        formData.append("shop_image", file.originFileObj);
      } else if (file.url && isEdit) {
        // Existing image during edit - don't send it
        console.log("Keeping existing image, not appending to FormData");
      } else if (!isEdit) {
        // Creating new shop but file doesn't have originFileObj
        message.error("Please upload a valid shop image");
        return;
      }
    }

    // Append other form fields
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    const url = isEdit
      ? `https://api.erp.seoulsourcing.com/api/shop/${shopId}/`
      : `https://api.erp.seoulsourcing.com/api/shop/`;

    const method = isEdit ? "PATCH" : "POST";

    try {
      console.log(fileList);
      setIsSubmitLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${auth?.authToken}`,
        },
        body: formData,
      });

      console.log(response);
      console.log("Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        setIsSubmitLoading(false);
        // Try to get error details from response
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", errorData);
        throw new Error(
          `${isEdit ? "Failed to edit shop" : "Failed to add shop"}`,
        );
      }

      if (response.ok) {
        setIsSubmitLoading(false);
        const data = await response.json();

        console.log(data);
        message.success(
          `${isEdit ? "Shop edited successfully" : "Shop added successfully"} | ${data.message}`,
        );
        if (!isEdit) {
          navigate("/shops", { replace: true });
        } else {
          refetchAllShops();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      setIsSubmitLoading(false);
      message.error(`${isEdit ? "Error editing shop" : "Error adding shop"}`);
      console.log("Error creating Shop:", error.message);
    }
  };

  return (
    <>
      <div className="py-10">
        <TBSImageUpload fileList={fileList} setFileList={setFileList} />
      </div>

      <Form
        form={form}
        name={`${shopId ? "edit" : "add"}`}
        layout="horizontal"
        onFinish={onSubmitHandler}
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
            virtual={false}
            listHeight={256}
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            dropdownStyle={{ overflowY: "auto" }}
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
            text={`${isEdit ? "Edit Shop" : "Add Shop"}`}
            style={"w-full"}
            isLoading={isSubmitLoading}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default TBSShopForm;
