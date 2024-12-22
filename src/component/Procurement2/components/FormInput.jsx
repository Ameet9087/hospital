import React from "react";

const FormInput = ({
  label,
  type,
  value,
  setValue,
  placeholder,
  required = false,
  options = [],
  readOnly = false,
  rows = 1,
}) => {
  if (type === "select") {
    return (
      <div className="goods-receipts-form-group">
        <label>{label}</label>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className="goods-receipts-form-group">
        <label>{label}</label>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          rows={rows}
        />
      </div>
    );
  } else {
    return (
      <div className="goods-receipts-form-group">
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
        />
      </div>
    );
  }
};

export default FormInput;
