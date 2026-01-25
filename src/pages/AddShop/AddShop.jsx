import { useState } from "react";

import TBSShopForm from "../../Components/Shared/TBSShopForm/TBSShopForm";

const AddShop = () => {
  const [fileList, setFileList] = useState([]);
  const [isAddShopLoading, setIsAddShopLoading] = useState(false);
  const [selectedThana, setSelectedThana] = useState(null);

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
