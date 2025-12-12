import { useEffect, useState } from "react";
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
  const [grandTotalPrice, setGrandTotalPrice] = useState(null);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useForm({
    defaultValues: {
      quantity: 1,
      discount: 0,
      price: 0,
      subtotal: 0,
    },
  });
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const quantity = watch("quantity");
  const discount = watch("discount");

  useEffect(() => {
    if (!selectedProduct) return;

    const qty = Number(quantity);
    const disc = Number(discount);
    const unitPrice = parseFloat(selectedProduct.price);
    const subtotal = qty * unitPrice - disc;
    setValue("subtotal", subtotal);
  }, [selectedProduct, quantity, discount, setValue]);

  console.log(allProducts);
  console.log(selectedProduct);

  const onAddItemBtnClick = () => {
    const orderList = [
      ...selectedProductsList,
      {
        ...selectedProduct,
        quantity: quantity,
        discount: discount,
        subtotal: watch("subtotal"),
      },
    ];
    const grandTotal = orderList.reduce(
      (total, product) => total + product.subtotal,
      0
    );
    setGrandTotalPrice(grandTotal);
    setSelectedProductsList(orderList);
    setSelectedProduct(null);
    resetField("quantity", { defaultValue: 1 });
    resetField("discount", { defaultValue: 0 });
    resetField("subtotal", { defaultValue: 0 });
  };
  const onDeleteItems = (productId) => {
    const updatedList = selectedProductsList.filter(
      (product) => product.product_id !== productId
    );
    const grandTotal = updatedList.reduce(
      (total, product) => total + product.subtotal,
      0
    );
    setGrandTotalPrice(grandTotal);
    setSelectedProductsList(updatedList);
  };
  const onCreateOrder = (data) => {
    console.log(data);
  };

  return (
    <form>
      <div className="hero bg-base-200 min-h-screen">
        <form className="card bg-base-100 w-full  shrink-0 shadow-2xl">
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
                      {/* Order Here */}
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
                            className="input "
                            defaultValue={1}
                            {...register("quantity", {
                              required: {
                                value: true,
                                message: "Quantity is required",
                              },
                            })}
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
                          className="input "
                          defaultValue={0}
                          {...register("discount")}
                        />
                      </div>
                      <div className="">
                        <label className="label">
                          <span className="label-text">Amount</span>
                        </label>
                        <input
                          type="text"
                          className="input "
                          disabled
                          {...register("subtotal")}
                        />
                      </div>
                    </div>
                    <TBSButton
                      onClickFn={() => onAddItemBtnClick()}
                      text={"Add Item"}
                    />

                    {/* Products Table */}
                    <div className="overflow-x-auto">
                      <table className="table">
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
                              <th>{index + 1}</th>
                              <td>{product.product_name}</td>
                              <td>{product.quantity}</td>
                              <td>{product.price}</td>
                              <td>{product.discount}</td>
                              <td>{product.subtotal}</td>
                              <td className="text-center  flex justify-center">
                                <MdDelete
                                  onClick={() =>
                                    onDeleteItems(product.product_id)
                                  }
                                  className="cursor-pointer text-red-500"
                                />
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <th colSpan={5} className="text-right">
                              Grand Total
                            </th>
                            <td>{grandTotalPrice}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <TBSButton
                      onClickFn={() => onCreateOrder()}
                      text={"Create Order"}
                    />
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
