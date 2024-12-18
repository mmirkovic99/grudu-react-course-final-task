import { SignupData } from "../interfaces/signup.interfaces";

export const signupEmptyState: SignupData = {
  email: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
  username: {
    value: "",
    error: "",
  },
  fullName: {
    value: "",
    error: "",
  },
};

export enum SIGNUP_INPUT_FILEDS {
  EMAIL = "Email",
  PASSWORD = "Password",
  USERNAME = "Username",
  FULL_NAME = "Full Name",
}

export enum SIGNUP_INPUT_VALIDATION_MESSAGES {
  EMAIL_INVALID = "Invalid email address.",
  FULL_NAME_INVALID = "Full Name is required field. Minimum 1 symbol, maximum 512 symbols.",
  PASSWORD_INVALID = "Passoword is required filed. Minimum length 8 symbols, maximum length 256 symbols.",
  USERNAME_REQUIRED = "Username is required filed.",
}

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_RESTRICTIONS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 256,
};

export const FULL_NAME_RESTRICTIONS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 512,
};
