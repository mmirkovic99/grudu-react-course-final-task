import { useState } from "react";
import CustomInput from "../../components/custom-input/CustomInput";
import "./Signup.css";
import { SignupData } from "./interfaces/signup.interfaces";
import {
  SIGNUP_INPUT_FILEDS,
  signupEmptyState,
} from "./constants/signup.constants";
import { API_METHODS, ENDPOINTS } from "../../common/constants/api.constants";
import CustomButton from "../../components/custom-button/CustomButton";
import {
  PASSWORD_RESTRICTIONS,
  FULL_NAME_RESTRICTIONS,
} from "../../common/constants/restrictions.constants";
import { EMAIL_REGEX } from "../../common/constants/regex.constants";
import { MESSAGE } from "../../common/constants/message.constant";
import { User } from "../../common/interfaces/user.interface";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../state/actions/userActions";

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupData>(signupEmptyState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setEmailRequiredError = () => {
    setSignupData((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        error: MESSAGE.EMAIL_REQUIRED,
      },
    }));
  };

  const setPasswordRequiredError = () => {
    setSignupData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        error: MESSAGE.PASSWORD_REQUIRED,
      },
    }));
  };

  const setUsernameRequiredError = () => {
    setSignupData((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        error: MESSAGE.USERNAME_REQUIRED,
      },
    }));
  };

  const setFullNameRequiredError = () => {
    setSignupData((prev) => ({
      ...prev,
      fullName: {
        ...prev.fullName,
        error: MESSAGE.FULL_NAME_REQUIRED,
      },
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    const formattedName = convertString(name);
    setSignupData((prev) => ({
      ...prev,
      [formattedName]: {
        ...[formattedName],
        value: value,
      },
    }));
  };

  const handleInputFocus = (label: string) => {
    switch (label) {
      case SIGNUP_INPUT_FILEDS.EMAIL: {
        if (!signupData.email.value) {
          setEmailRequiredError();
        }
        break;
      }
      case SIGNUP_INPUT_FILEDS.PASSWORD: {
        if (!signupData.password.value) {
          setPasswordRequiredError();
        }
        break;
      }
      case SIGNUP_INPUT_FILEDS.USERNAME: {
        if (!signupData.username.value) {
          setUsernameRequiredError();
        }
        break;
      }
      case SIGNUP_INPUT_FILEDS.FULL_NAME: {
        if (!signupData.fullName.value) {
          setFullNameRequiredError();
        }
        break;
      }
      default:
        break;
    }
  };

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

  const resetErrors = () => {
    setSignupData((prev) => ({
      ...prev,
      username: {
        ...prev.username,
        error: "",
      },
      password: {
        ...prev.password,
        error: "",
      },
      email: {
        ...prev.email,
        error: "",
      },
      fullName: {
        ...prev.fullName,
        error: "",
      },
    }));
  };

  const checkEmailAddress = (email: string) => {
    if (!email) {
      setEmailRequiredError();
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setSignupData((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: MESSAGE.EMAIL_INVALID,
        },
      }));
      return false;
    }
    return true;
  };

  const checkPassword = (password: string) => {
    if (password.length < PASSWORD_RESTRICTIONS.minLenght) {
      setSignupData((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: MESSAGE.PASSWORD_INVALID_MIN_LENGTH,
        },
      }));
      return false;
    }
    if (password.length > PASSWORD_RESTRICTIONS.maxLength) {
      setSignupData((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: MESSAGE.PASSWORD_INVALID_MAX_LENGTH,
        },
      }));
      return false;
    }
    return true;
  };

  const checkUsername = async (username: string) => {
    try {
      if (!username) {
        setUsernameRequiredError();
        return false;
      }
      const response = await fetch(`${ENDPOINTS.USERS}`);
      const users: User[] = await response.json();
      let isUsernameAvailable = true;
      if (users?.length && response.ok) {
        isUsernameAvailable = !users.find((user) => user.id === username);
      }
      if (!isUsernameAvailable) {
        setSignupData((prev) => ({
          ...prev,
          username: {
            ...prev.username,
            error: MESSAGE.USERNAME_NOT_AVAILABLE,
          },
        }));
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const checkFullName = (fullName: string) => {
    if (fullName.length < FULL_NAME_RESTRICTIONS.minLenght) {
      setSignupData((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          error: MESSAGE.FULL_NAME_INVALID_MIN_LENGTH,
        },
      }));
      return false;
    }
    if (fullName.length > FULL_NAME_RESTRICTIONS.maxLength) {
      setSignupData((prev) => ({
        ...prev,
        fullName: {
          ...prev.fullName,
          error: MESSAGE.FULL_NAME_INVALID_MAX_LENGTH,
        },
      }));
      return false;
    }
    return true;
  };

  const saveUserData = (user: User) => {
    const options = {
      method: API_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch(`${ENDPOINTS.USERS}`, options)
      .then((response) => response.json())
      .then((user) => {
        dispatch(setUser(user));
        navigate("/twitter");
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const signup = async () => {
    resetErrors();
    const { email, password, username, fullName } = signupData;
    const isEmailValid = checkEmailAddress(email.value);
    const isUsernameValid = await checkUsername(username.value);
    const isPasswordValid = checkPassword(password.value);
    const isFullNameValid = checkFullName(fullName.value);
    if (isEmailValid && isPasswordValid && isUsernameValid && isFullNameValid) {
      const user: User = {
        email: email.value,
        password: password.value,
        id: username.value,
        name: fullName.value,
      };
      saveUserData(user);
    }
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__title"> Sign up</div>
        {Object.entries(SIGNUP_INPUT_FILEDS).map(([key, label]) => (
          <CustomInput
            key={key}
            value={signupData[convertToPropertyName(label)].value}
            placeholder={label}
            error={signupData[convertToPropertyName(label)].error}
            type={label === SIGNUP_INPUT_FILEDS.PASSWORD ? "password" : "text"}
            onInputChange={(event) => {
              handleInputChange(label, event.target.value);
            }}
            onInputTouch={() => {
              handleInputFocus(label);
            }}
          ></CustomInput>
        ))}
        <div className="signup__button-container">
          <CustomButton label="Sign up" onClick={signup}></CustomButton>
        </div>
      </div>
      <div className="signup__login-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
};

export default Signup;
