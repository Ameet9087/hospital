import { useState, useEffect, useRef } from "react";

const FloatingSelect = ({
  label,
  options = [],
  value,
  required,
  onChange,
  name,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const [isInvalid, setIsInvalid] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
    if (required && !e.target.value) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update hasValue and isInvalid
    setHasValue(value !== "");
    setIsInvalid(required && !value);

    // Call the parent onChange function
    if (onChange) {
      onChange({ target: { name, value } }); // Send the correct structure to onChange
    }
  };

  return (
    <div
      className={`custom-floating-select-field ${
        isFocused || hasValue ? "active" : ""
      } ${isInvalid ? "error" : ""}`}
    >
      <select
        ref={selectRef}
        className="custom-floating-select"
        value={value}
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      >
        <option value="" disabled hidden>
          {label} {/* Placeholder text */}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="custom-floating-select-label">{label}</label>
    </div>
  );
};

export default FloatingSelect;
