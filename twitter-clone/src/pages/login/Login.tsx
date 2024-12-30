import "./Login.css";
import CustomInput from "../../components/custom-input/CustomInput";
import { useState } from "react";
import { LoginState } from "./interface/login.interface";
import { LOGIN_INITIAL_STATE } from "./constant/login.constant";
import { MESSAGE } from "../../common/constants/message.constant";
import { User } from "../../common/interfaces/user.interface";
import { ENDPOINTS } from "../../common/constants/api.constants";
import CustomButton from "../../components/custom-button/CustomButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginState, setLoginState] = useState<LoginState>(LOGIN_INITIAL_STATE);
  const [commonErrorMessage, setCommonErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLoginState((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        value: event.target.value,
      },
    }));
  };

  const handleUsernameInputTouch = () => {
    if (!loginState.username.value) {
      setUsernameRequiredError();
    }
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLoginState((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        value: event.target.value,
      },
    }));
  };

  const handlePasswordInputTouch = () => {
    if (!loginState.password.value) {
      setPasswordRequiredError();
    }
  };

  const setPasswordRequiredError = () => {
    setLoginState((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        error: MESSAGE.PASSWORD_REQUIRED,
      },
    }));
  };

  const setUsernameRequiredError = () => {
    setLoginState((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        error: MESSAGE.USERNAME_REQUIRED,
      },
    }));
  };

  const resetErrorMessages = () => {
    setLoginState((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        error: "",
      },
      password: {
        ...prev.password,
        error: "",
      },
    }));
    setCommonErrorMessage("");
  };

  const login = async () => {
    resetErrorMessages();
    const { username, password } = loginState;
    if (password?.value && username?.value) {
      const response = await fetch(`${ENDPOINTS.USERS}/${username.value}`);
      if (!response.ok) {
        setCommonErrorMessage(
          response.status === 404
            ? MESSAGE.USERNAME_PASSWORD_INVLAID
            : MESSAGE.SYSTEM_ERROR
        );
        return;
      }
      const user: User = await response.json();
      if (password.value !== user.password) {
        setCommonErrorMessage(MESSAGE.USERNAME_PASSWORD_INVLAID);
        return;
      }
      dispatch(setUser(user));
      navigate("/twitter");
      return;
    }
    if (!password.value) setPasswordRequiredError();
    if (!username.value) setUsernameRequiredError();
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__title"> Log in</div>
        <CustomInput
          value={loginState.username.value}
          placeholder="Username"
          error={loginState.username.error}
          onInputChange={handleUsernameChange}
          onInputTouch={() => handleUsernameInputTouch()}
        />
        <CustomInput
          value={loginState.password.value}
          error={loginState.password.error}
          type="password"
          placeholder="Password"
          onInputChange={handlePasswordChange}
          onInputTouch={() => handlePasswordInputTouch()}
        />
        {commonErrorMessage && (
          <span className="login__error">{commonErrorMessage}</span>
        )}
        <div className="login__button-container">
          <CustomButton label="Log in" onClick={login} />
        </div>
      </div>
      <div className="login__signup-link">
        Don't have an account. <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
