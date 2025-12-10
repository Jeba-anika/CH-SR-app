import React, { useEffect, useState } from "react";
import { TBSShopSelect } from "./TBSShopSelect";
import Select from "react-select/base";
import TBSInput from "../../Components/Shared/TBSInput/TBSInput";
import { useForm } from "react-hook-form";
import TBSButton from "../../Components/Shared/TBSButton/TBSButton";

const CreateOrder = () => {
  const [allShops, setAllShops] = useState();
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    fetch("shops.json")
      .then((res) => res.json())
      .then((data) => setAllShops(data));
  }, []);
  console.log(allShops);
  console.log(selectedShopkeeper);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form>
      <div className="hero bg-base-200 min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        >
          <div className="card-body">
            <fieldset className="fieldset">
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
                <div className="card-body">
                  <fieldset className="fieldset">
                    <TBSShopSelect
                      allShops={allShops}
                      selectedShopkeeper={selectedShopkeeper}
                      setSelectedShopkeeper={setSelectedShopkeeper}
                    />
                    <label className={"label"}>Customer Name</label>
                    <input
                      type="text"
                      value={
                        selectedShopkeeper
                          ? selectedShopkeeper?.customer_name
                          : "Customer Name"
                      }
                      className="input "
                      disabled
                    />
                    <TBSButton text={"Create Order"} />
                  </fieldset>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </div>

      {/* <TBSInput
        value={
          selectedShopkeeper
            ? selectedShopkeeper?.customer_name
            : "Customer Name"
        }
        label={"Customer Name"}
        name={"customer-name"}
        formRegister={register}
        inputClsName={"input"}
        inputType={"text"}
        isDisabled={true}
      /> */}
    </form>
  );
};

export default CreateOrder;
