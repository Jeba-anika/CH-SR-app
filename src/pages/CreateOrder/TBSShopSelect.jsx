import Select from "react-select";

// const shopkeepers = [
//   { value: "1", label: "Shop A" },
//   { value: "2", label: "Shop B" },
//   { value: "3", label: "Shop C" },
// ];

export function TBSShopSelect({
  allShops,
  selectedShopkeeper,
  setSelectedShopkeeper,
}) {
  const shopOptions = allShops?.map((shop) => ({
    value: shop.shop_id,
    label: shop.shop_name,
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
