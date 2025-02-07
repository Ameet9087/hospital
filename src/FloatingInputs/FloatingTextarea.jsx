import { useState, useEffect, useRef } from "react";

const FloatingTextarea = ({
  label,
  value = "",
  onChange,
  required,
  restrictions,
  name,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const [isInvalid, setIsInvalid] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleInputChange = (event) => {
    const { value: inputValue, name } = event.target;
    let updatedValue = inputValue;

    if (restrictions) {
      const { min, max, varchar, char } = restrictions;

      if (min !== undefined && inputValue.length < min) return;
      if (max !== undefined && inputValue.length > max) return;
      if (varchar && !/^[a-zA-Z0-9\s]*$/.test(inputValue)) return; // Allow spaces
      if (char && !/^[a-zA-Z\s]*$/.test(inputValue)) return; // Allow spaces
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
      <textarea
        ref={textareaRef}
        name={name}
        className="custom-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
        {...props}
      />
      <label className="custom-floating-label">{label}</label>
    </div>
  );
};

export default FloatingTextarea;
