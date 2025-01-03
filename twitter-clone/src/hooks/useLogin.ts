import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MESSAGE } from "../common/constants/message.constant";
import { User } from "../common/interfaces/user.interface";
import { UserContext } from "../context/UserContext";
import { LOGIN_INITIAL_STATE } from "../pages/login/constant/login.constant";
import { LoginState } from "../pages/login/interface/login.interface";
import { apiService } from "../services/apiService";
import useInputHandlers from "./useInputHandlers";

const useLogin = () => {
  const [loginState, setLoginState] = useState<LoginState>(LOGIN_INITIAL_STATE);
  const [commonErrorMessage, setCommonErrorMessage] = useState<string>("");
  const { setUser } = useContext(UserContext) || { setUser: () => {} };
  const navigate = useNavigate();

  const { handleInputChange, handleInputTouch, resetErrorMessages, setError } =
    useInputHandlers(loginState, setLoginState);

  const login = async () => {
    try {
      resetErrorMessages();
      const { username, password } = loginState;
      if (username?.value && password?.value) {
        const user: User = await apiService.getUserByUsername(username.value);
        if (user.password === password.value) {
          setUser(user);
          navigate("/twitter");
          return;
        } else {
          setCommonErrorMessage(MESSAGE.USERNAME_PASSWORD_INVLAID);
        }
      }
      if (!password.value) setError("password", MESSAGE.PASSWORD_REQUIRED);
      if (!username.value) setError("username", MESSAGE.USERNAME_REQUIRED);
    } catch (error: any) {
      setCommonErrorMessage(error.message);
    }
  };

  return {
    loginState,
    commonErrorMessage,
    handleInputChange,
    handleInputTouch,
    login,
  };
};

export default useLogin;
