import React, { useState } from "react";
import TBSModal from "../../Components/Shared/TBSModal/TBSModal";
import TBSShopForm from "../../Components/Shared/TBSShopForm/TBSShopForm";
import TBSSpin from "../../Components/Shared/TBSSpin/TBSSpin";
import useFetchShopDataHandler from "../../hooks/useFetchShopDataHandler";

const EditShop = ({
  isModalOpen,
  setIsModalOpen,
  selectedShopId,
  refetchAllShops,
  selectedShop,
}) => {
  const [fileList, setFileList] = useState([]);
  const [isEditShopLoading, setIsEditShopLoading] = useState(false);
  const [selectedThana, setSelectedThana] = useState(null);
  // const { shopData, isShopLoading } = useFetchShopDataHandler({
  //   shopId: selectedShopId,
  //   isEdit: Boolean(selectedShopId),
  //   setFileList,
  // });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editShopBody = (
    <>
      {!selectedShop && !Object.entries(selectedShop).length > 0 ? (
        <TBSSpin />
      ) : (
        <TBSShopForm
          fileList={fileList}
          isSubmitLoading={isEditShopLoading}
          selectedThana={selectedThana}
          setFileList={setFileList}
          setSelectedThana={setSelectedThana}
          shopId={selectedShopId}
          shopData={selectedShop}
          setIsSubmitLoading={setIsEditShopLoading}
          refetchAllShops={refetchAllShops}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
  return (
    <div>
      <TBSModal
        title="Edit Shop"
        isModalOpen={isModalOpen}
        body={editShopBody}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default EditShop;
