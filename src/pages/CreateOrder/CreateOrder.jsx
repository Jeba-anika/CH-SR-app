import React, { useEffect, useState } from "react";
import { TBSShopSelect } from "./TBSShopSelect";
import Select from "react-select/base";
import TBSInput from "../../Components/Shared/TBSInput/TBSInput";
import { useForm } from "react-hook-form";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";
import TBSDropdownSelect from "../../Components/Shared/TBSDropdownSelect/TBSDropdownSelect";
import { MdDelete } from "react-icons/md";

const CreateOrder = () => {
  const [allShops, setAllShops] = useState();
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  const [allProducts, setAllProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductQty, setSelectedProductQty] = useState(null);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopsRes = await fetch("shops.json");
        const allShopsJSON = await shopsRes.json();
        const shopOptions = allShopsJSON?.map((shop) => ({
          value: shop.shop_id,
          label: shop.shop_name,
          ...shop,
        }));
        setAllShops(shopOptions);

        const productsRes = await fetch("products.json");
        const products = await productsRes.json();
        console.log(products);
        const productOptions = products?.map((product) => ({
          value: product.product_id,
          label: product.product_name,
          ...product,
        }));
        setAllProducts(productOptions);

        //
        setSelectedProductsList(productOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(allProducts);
  console.log(selectedProduct);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form>
      <div className="hero bg-base-200 min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 w-full  shrink-0 shadow-2xl"
        >
          <div className="card-body">
            <fieldset className="fieldset">
              <div className="card bg-base-100 w-full  shrink-0 shadow-xl">
                <div className="card-body">
                  <fieldset className="fieldset">
                    <TBSDropdownSelect
                      label={"Select Shop"}
                      options={allShops}
                      selectedOption={selectedShopkeeper}
                      setSelectedOption={setSelectedShopkeeper}
                    ></TBSDropdownSelect>
                    <label className={"label"}>Customer Name</label>
                    <input
                      type="text"
                      value={
                        selectedShopkeeper
                          ? selectedShopkeeper?.customer_name
                          : "Customer Name"
                      }
                      className="input w-full "
                      disabled
                    />
                    <label className={"label"}>Phone Number</label>
                    <input
                      type="text"
                      value={
                        selectedShopkeeper
                          ? selectedShopkeeper?.phone_number
                          : "Phone Number"
                      }
                      className="input w-full"
                      disabled
                    />
                    {selectedShopkeeper && (
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-1">
                          Thana: {selectedShopkeeper?.thana}
                        </div>
                        <div className="col-span-1">
                          District: {selectedShopkeeper?.district}
                        </div>
                        <div className="col-span-2">
                          Address: {selectedShopkeeper?.address}
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="text-center text-2xl">Order Here</h3>
                      <div className="grid grid-cols-5 gap-4 w-full">
                        <div className="col-span-3">
                          <TBSDropdownSelect
                            label={"Select Product"}
                            options={allProducts}
                            selectedOption={selectedProduct}
                            setSelectedOption={setSelectedProduct}
                          ></TBSDropdownSelect>
                        </div>
                        <div className="">
                          <label className="label">
                            <span className="label-text">Quantity</span>
                          </label>
                          <input
                            type="number"
                            className="input validator"
                            required
                            placeholder="Type a number "
                            defaultValue={"1"}
                          />
                        </div>
                        <div className="">
                          <label className="label">
                            <span className="label-text">Price</span>
                          </label>
                          <input
                            type="text"
                            value={
                              selectedProduct ? selectedProduct?.price : "Price"
                            }
                            className="input w-full"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <div className="">
                        <label className="label">
                          <span className="label-text">Discount</span>
                        </label>
                        <input
                          type="number"
                          className="input validator"
                          required
                          placeholder="Quantity"
                          onChange={(e) =>
                            setSelectedProductQty(e.target.value)
                          }
                        />
                      </div>
                      <div className="">
                        <label className="label">
                          <span className="label-text">Amount</span>
                        </label>
                        <input
                          type="text"
                          value={
                            selectedProduct
                              ? parseInt(selectedProduct?.price) *
                                parseInt(selectedProductQty || 1)
                              : "Total Amount"
                          }
                          className="input w-full"
                          disabled
                        />
                      </div>
                    </div>
                    <TBSButton text={"Add Item"} />

                    {/* Products Table */}
                    <div className="overflow-x-auto">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Sl</th>
                            <th>Item Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProductsList.map((product, index) => (
                            <tr key={product?.product_id}>
                              <th>{index}</th>
                              <td>{product.product_name}</td>
                              <td>Quantity</td>
                              <td>{product.price}</td>
                              <td>Discount</td>
                              <td>Amount</td>
                              <div className="text-center">
                                <MdDelete className="cursor-pointer text-red-500" />
                              </div>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <TBSButton text={"Create Order"} />
                  </fieldset>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </form>
  );
};

export default CreateOrder;
