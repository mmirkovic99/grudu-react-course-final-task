import "../../styles/Container.css";
import CustomInput from "../../components/custom-input/CustomInput";
import { useContext, useState } from "react";
import { LoginState } from "./interface/login.interface";
import { LOGIN_INITIAL_STATE } from "./constant/login.constant";
import { MESSAGE } from "../../common/constants/message.constant";
import { User } from "../../common/interfaces/user.interface";
import CustomButton from "../../components/custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import useInputHandlers from "../../hooks/InputHandlers";
import { UserContext } from "../../context/UserContext";

const Login = () => {
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
        }
      }
      if (!password.value) setError("password", MESSAGE.PASSWORD_REQUIRED);
      if (!username.value) setError("username", MESSAGE.USERNAME_REQUIRED);
    } catch (error: any) {
      setCommonErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <div className=" container__content">
        <div className="container__title"> Log in</div>
        <CustomInput
          value={loginState.username.value}
          placeholder="Username"
          error={loginState.username.error}
          onInputChange={(e) => handleInputChange("username", e)}
          onInputTouch={() => handleInputTouch("username")}
        />
        <CustomInput
          value={loginState.password.value}
          error={loginState.password.error}
          type="password"
          placeholder="Password"
          onInputChange={(e) => handleInputChange("password", e)}
          onInputTouch={() => handleInputTouch("password")}
        />
        {commonErrorMessage && (
          <span className="container__error">{commonErrorMessage}</span>
        )}
        <div className="container__button-container">
          <CustomButton label="Log in" onClick={login} />
        </div>
      </div>
      <div className="container__link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
