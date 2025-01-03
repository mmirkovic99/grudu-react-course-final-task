import CustomInput from "../../components/custom-input/CustomInput";
import containerStyles from "../../styles/Container.module.css";
import errorStyles from "../../styles/Error.module.css";
import { SIGNUP_INPUT_FILEDS } from "./constants/signup.constants";
import CustomButton from "../../components/custom-button/CustomButton";

import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const {
    signupData,
    commonErrorMessage,
    handleInputChange,
    handleInputTouch,
    signup,
    convertToPropertyName,
  } = useSignup();

  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.containerContent}>
        <div className={containerStyles.containerTitle}> Sign up</div>
        {Object.entries(SIGNUP_INPUT_FILEDS).map(([key, label]) => (
          <CustomInput
            key={key}
            value={signupData[convertToPropertyName(label)].value}
            placeholder={label}
            error={signupData[convertToPropertyName(label)].error}
            type={label === SIGNUP_INPUT_FILEDS.PASSWORD ? "password" : "text"}
            onInputChange={(event) => {
              handleInputChange(convertToPropertyName(label), event);
            }}
            onInputTouch={() => {
              handleInputTouch(convertToPropertyName(label));
            }}
          />
        ))}
        <div className={containerStyles.containerButtonContainer}>
          <CustomButton label="Sign up" onClick={signup} />
        </div>
        {commonErrorMessage && (
          <span className={errorStyles.containerError}>
            {commonErrorMessage}
          </span>
        )}
      </div>
      <div className={containerStyles.containerLink}>
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
};

export default Signup;
