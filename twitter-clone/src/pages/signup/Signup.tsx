import React, { useState } from "react";
import logo from "./logo.svg";
import CustomInput from "../../components/custom-input/CustomInput";
import "./Signup.css";
import { SignupData } from "./interfaces/signup.interfaces";
import {
  SIGNUP_INPUT_FILEDS,
  signupEmptyState,
  SIGNUP_INPUT_VALIDATION_MESSAGES,
  EMAIL_REGEX,
  PASSWORD_RESTRICTIONS,
  FULL_NAME_RESTRICTIONS,
} from "./constants/signup.constants";
import { Link } from "react-router-dom";
import { API_METHODS } from "../../common/constants/api.constants";

function Signup() {
  let [signupData, setSignupData] = useState<SignupData>(signupEmptyState);

  const signup = () => {
    const { email, password, username, fullName } = signupData;
    if (email && (!email.value || !EMAIL_REGEX.test(email.value))) {
      setSignupData((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: SIGNUP_INPUT_VALIDATION_MESSAGES.EMAIL_INVALID,
        },
      }));
    }
    if (username && !username.value) {
      setSignupData((prev) => ({
        ...prev,
        username: {
          ...username,
          error: SIGNUP_INPUT_VALIDATION_MESSAGES.USERNAME_REQUIRED,
        },
      }));
    }
    if (
      password &&
      (!password.value ||
        password.value.trim().length < PASSWORD_RESTRICTIONS.MIN_LENGTH ||
        password.value.trim().length > PASSWORD_RESTRICTIONS.MAX_LENGTH)
    ) {
      setSignupData((prev) => ({
        ...prev,
        password: {
          ...password,
          error: SIGNUP_INPUT_VALIDATION_MESSAGES.PASSWORD_INVALID,
        },
      }));
    }
    if (
      fullName &&
      (!fullName.value ||
        fullName.value.trim().length < FULL_NAME_RESTRICTIONS.MIN_LENGTH ||
        fullName.value.trim().length > FULL_NAME_RESTRICTIONS.MAX_LENGTH)
    ) {
      setSignupData((prev) => ({
        ...prev,
        fullName: {
          ...password,
          error: SIGNUP_INPUT_VALIDATION_MESSAGES.FULL_NAME_INVALID,
        },
      }));
    }
    saveUserData();
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

  const saveUserData = () => {
    const { email, password, username, fullName } = signupData;
    const userData = {
      id: username.value,
      name: fullName.value,
      email: email.value,
      password: password.value,
    };
    const options = {
      method: API_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch("http://localhost:3001/users", options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
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
            onChange={(event) => {
              handleInputChange(label, event.target.value);
            }}
          ></CustomInput>
        ))}
        <div className="signup__button-container">
          <button className="signup__button" onClick={signup}>
            Sign up
          </button>
        </div>
      </div>
      <div className="signup__login-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}

export default Signup;
