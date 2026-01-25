import Select from "react-select";

export function TBSShopSelect({
  allShops,
  selectedShopkeeper,
  setSelectedShopkeeper,
}) {
  const shopOptions = allShops?.map((shop) => ({
    value: shop.shop_id,
    label: shop.shop_name,
    ...shop,
  }));
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">Select Shopkeeper</span>
      </label>
      <Select
        options={shopOptions}
        value={selectedShopkeeper}
        onChange={(selectedShopkeeper) =>
          setSelectedShopkeeper(selectedShopkeeper)
        }
        placeholder="Search and select..."
        isSearchable
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
