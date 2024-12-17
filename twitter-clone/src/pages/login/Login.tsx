import "./Login.css";
import CustomInput from "../../components/custom-input/CustomInput";
import { useState } from "react";

interface LoginData {
  username: string;
  password: string;
}

const emptyData: LoginData = {
  username: "",
  password: "",
};

const Login = () => {
  let [loginData, setLoginData] = useState<LoginData>(emptyData);
  let [error, setError] = useState<string>("");
  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLoginData({
      ...loginData,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  };

  const login = () => {
    const { username, password } = loginData;
    if (!username) {
      setError("Username is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__title"> Log in</div>
        <CustomInput
          value={loginData.username}
          placeholder="Username"
          onChange={handleUsernameChange}
        ></CustomInput>
        <CustomInput
          value={loginData.password}
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        ></CustomInput>
        {error && <span className="login__error">{error}</span>}
        <div className="login__button-container">
          <button className="login__button" onClick={login}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
