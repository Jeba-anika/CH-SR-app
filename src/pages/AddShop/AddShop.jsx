import { Flex, Form, Input, message, Select } from "antd";
import React, { useState } from "react";
import TBSFormItemField from "../../Components/Shared/TBSFormItemField/TBSFormItemField";
import TextArea from "antd/es/input/TextArea";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";

import TBSImageUpload from "../../Components/Shared/TBSImageUpload/TBSImageUpload";

import TBSShopForm from "../../Components/Shared/TBSShopForm/TBSShopForm";

const AddShop = () => {
  const [fileList, setFileList] = useState([]);
  const [isAddShopLoading, setIsAddShopLoading] = useState(false);
  const [selectedThana, setSelectedThana] = useState(null);

  //   console.log("Success:", values);
  //   const payload = {
  //     ...values,
  //     district: selectedThana?.city_name,
  //   };
  //   console.log(payload);
  //   const formData = new FormData();
  //   formData.append("shop_image", fileList[0].originFileObj);
  //   Object.entries(payload).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });
  //   try {
  //     console.log(fileList);
  //     setIsAddShopLoading(true);
  //     const response = await fetch(
  //       "https://api.erp.seoulsourcing.com/api/shop/",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${auth?.authToken}`,
  //         },
  //         body: formData,
  //       },
  //     );
  //     console.log(response);
  //     if (!response.ok) {
  //       setIsAddShopLoading(false);
  //       throw new Error("Failed to add shop");
  //     }
  //     if (response.ok) {
  //       setIsAddShopLoading(false);
  //       const data = await response.json();

  //       console.log(data);
  //       message.success("Shop added successfully" | data.message);
  //       navigate("/shops", { replace: true });
  //     }
  //   } catch (error) {
  //     message.error("Error adding shop");
  //     console.log("Error creating Shop:", error.message);
  //   }
  // };

  return (
    <div className="m-10">
      <h1 className="text-3xl text-center font-bold mb-5">Add Shop</h1>

      <TBSShopForm
        fileList={fileList}
        setFileList={setFileList}
        isSubmitLoading={isAddShopLoading}
        selectedThana={selectedThana}
        setSelectedThana={setSelectedThana}
        setIsSubmitLoading={setIsAddShopLoading}
      />
    </div>
  );
};

export default AddShop;
