import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../common/interfaces/user.interface";
import { UserContext } from "../context/UserContext";
import { signupEmptyState } from "../pages/signup/constants/signup.constants";
import { SignupData } from "../pages/signup/interfaces/signup.interfaces";
import { apiService } from "../services/apiService";
import { validatorService } from "../services/validatorService";
import useInputHandlers from "./useInputHandlers";

const useSignup = () => {
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

  return {
    signupData,
    commonErrorMessage,
    handleInputChange,
    handleInputTouch,
    signup,
    convertToPropertyName,
  };
};

export default useSignup;
