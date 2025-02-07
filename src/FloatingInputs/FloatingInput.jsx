import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react"; // Importing search icon from lucide-react

const FloatingInput = ({
  label,
  type = "text",
  value = "",
  onChange,
  required,
  restrictions,
  name,
  onIconClick, // New prop for handling icon click
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleInputChange = (event) => {
    const { value: inputValue, name } = event.target;
    let updatedValue = inputValue;
    if (restrictions) {
      const { min, max, number, varchar, char } = restrictions;

      if (min !== undefined && inputValue.length < min) return;
      if (max !== undefined && inputValue.length > max) return;
      if (number && !/^\d*$/.test(inputValue)) return;
      if (varchar && !/^[a-zA-Z0-9]*$/.test(inputValue)) return;
      if (char && !/^[a-zA-Z]*$/.test(inputValue)) return;
    }
    if (onChange) {
      onChange({
        target: { name, value: updatedValue },
      });
    }
  };

  useEffect(() => {
    if (required && !value) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [value, required]);

  return (
    <div
      className={`custom-floating-field ${
        isFocused || hasValue ? "active" : ""
      } ${isInvalid ? "error" : ""}`}
    >
      <input
        ref={inputRef}
        type={type}
        name={name}
        className="custom-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        {...props}
      />
      <label className="custom-floating-label">{label}</label>

      {/* Render search icon only if type is "search" */}
      {type === "search" && (
        <i
          className="fa-solid fa-magnifying-glass custom-search-icon"
          onClick={onIconClick}
        />
      )}
    </div>
  );
};
export default FloatingInput;
