import { useContext, useState } from "react";
import CustomInput from "../../components/custom-input/CustomInput";
import containerStyles from "../../styles/Container.module.css";
import errorStyles from "../../styles/Error.module.css";
import { SignupData } from "./interfaces/signup.interfaces";
import {
  SIGNUP_INPUT_FILEDS,
  signupEmptyState,
} from "./constants/signup.constants";
import CustomButton from "../../components/custom-button/CustomButton";
import { User } from "../../common/interfaces/user.interface";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import { validatorService } from "../../services/validatorService";
import useInputHandlers from "../../hooks/useInputHandlers";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupData>(signupEmptyState);
  const [commonErrorMessage, setCommonErrorMessage] = useState<string>("");
  const { setUser } = useContext(UserContext) || { setUser: () => {} };
  const navigate = useNavigate();

  const { handleInputChange, handleInputTouch, resetErrorMessages, setError } =
    useInputHandlers(signupData, setSignupData);

  const convertToPropertyName = (name: string): keyof SignupData => {
    return convertString(name) as any;
  };

  const convertString = (str: string): string => {
    return str
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.charAt(0).toLowerCase() + word.slice(1)
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };
  //   setSignupData((prev) => ({
  //     ...prev,
  //     username: {
  //       ...prev.username,
  //       error: "",
  //     },
  //     password: {
  //       ...prev.password,
  //       error: "",
  //     },
  //     email: {
  //       ...prev.email,
  //       error: "",
  //     },
  //     fullName: {
  //       ...prev.fullName,
  //       error: "",
  //     },
  //   }));
  // };

  const signup = async () => {
    try {
      resetErrorMessages();
      const { email, password, username, fullName } = signupData;
      const emailMessage = validatorService.checkEmailAddress(email.value);
      const passwordMessage = validatorService.checkPassword(
        password.value,
        true
      );
      const usernameMessage = await validatorService.checkUsername(
        username.value,
        true
      );
      const fullNameMessage = validatorService.checkFullName(fullName.value);
      if (
        !emailMessage &&
        !passwordMessage &&
        !usernameMessage &&
        !fullNameMessage
      ) {
        const user: User = {
          email: email.value,
          password: password.value,
          id: username.value,
          name: fullName.value,
        };
        await apiService.saveUser(user);
        setUser(user);
        navigate("/twitter");
      } else {
        setError("email", emailMessage);
        setError("password", passwordMessage);
        setError("username", usernameMessage);
        setError("fullName", fullNameMessage);
      }
    } catch (error: any) {
      setCommonErrorMessage(error.message);
    }
  };

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
