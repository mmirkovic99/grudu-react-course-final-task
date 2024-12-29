import React, { useState } from "react";
import "./CustomInput.css";

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
    <div className="input__container">
      {isRegularInput && (
        <input
          className={`input__field ${error ? "input__error" : ""}`}
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
          className={`input__teaxtarea ${error ? "input__error" : ""}`}
          placeholder={placeholder}
          onChange={onTextAreaChange}
        ></textarea>
      )}
      {error && <span className="input__error-label">{error}</span>}
    </div>
  );
};

export default CustomInput;
