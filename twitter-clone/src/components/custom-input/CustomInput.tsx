import React, { useState } from "react";
import inputStyles from "../../styles/Input.module.css";
import errorStyles from "../../styles/Error.module.css";

interface CustomInputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextAreaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInputTouch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isRegularInput?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = "text",
  placeholder,
  onInputChange,
  onInputTouch,
  onTextAreaChange,
  error = "",
  isRegularInput = true,
  value,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleFocus = () => {
    setIsTouched(true);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isTouched && onInputTouch) {
      onInputTouch(event);
    }
  };

  return (
    <div className={inputStyles.inputContainer}>
      {isRegularInput && (
        <input
          className={`${inputStyles.inputField} ${
            error ? inputStyles.inputError : ""
          }`}
          type={type}
          placeholder={placeholder}
          onChange={onInputChange}
          onFocus={() => handleFocus()}
          onBlur={(event) => handleBlur(event)}
        />
      )}
      {!isRegularInput && (
        <textarea
          value={value}
          className={`${inputStyles.inputTeaxtarea} ${
            error ? inputStyles.inputError : ""
          }`}
          placeholder={placeholder}
          onChange={onTextAreaChange}
        ></textarea>
      )}
      {error && <span className={errorStyles.inputErrorLabel}>{error}</span>}
    </div>
  );
};

export default CustomInput;
