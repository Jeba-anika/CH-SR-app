import React from "react";
import Select from "react-select";

const TBSDropdownSelect = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  console.log(options);
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selectedOption) => setSelectedOption(selectedOption)}
        placeholder="Search and select..."
        isSearchable
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default TBSDropdownSelect;
