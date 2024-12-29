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
