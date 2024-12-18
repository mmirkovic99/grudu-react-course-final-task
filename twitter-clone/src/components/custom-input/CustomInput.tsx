import React from "react";
import "./CustomInput.css";

interface CustomInputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = "text",
  placeholder,
  onChange,
  error = "",
}) => {
  return (
    <div className="input__container">
      <input
        className={`input__field ${error ? "input__error" : ""}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <span className="input__error-label">{error}</span>}
    </div>
  );
};

export default CustomInput;
