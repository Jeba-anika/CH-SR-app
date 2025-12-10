const TBSInput = ({
  label,
  name,
  placeholder,
  inputClsName,
  labelClsName,
  inputType,
  formRegister,
  errors,
  isRequired,
  isDisabled,
}) => {
  return (
    <>
      <div>
        <label className={labelClsName}>{label}</label>
        <input
          {...formRegister(name, { required: isRequired })}
          type={inputType}
          className={inputClsName}
          placeholder={placeholder}
          disabled={isDisabled}
        />
      </div>
      {errors && errors[name] && (
        <span className="text-red-500">
          {errors[name].type === "required"
            ? "This field is required."
            : "There is an error"}
        </span>
      )}
    </>
  );
};

export default TBSInput;
