import containerStyles from "../../styles/Container.module.css";
import errorStyles from "../../styles/Error.module.css";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const {
    loginState,
    commonErrorMessage,
    handleInputChange,
    handleInputTouch,
    login,
  } = useLogin();

  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.containerContent}>
        <div className={containerStyles.containerTitle}> Log in</div>
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
          <span className={errorStyles.containerError}>
            {commonErrorMessage}
          </span>
        )}
        <div className={containerStyles.containerButtonContainer}>
          <CustomButton label="Log in" onClick={login} />
        </div>
      </div>
      <div className={containerStyles.containerLink}>
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
