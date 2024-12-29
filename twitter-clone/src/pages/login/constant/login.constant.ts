import { LoginState } from "../interface/login.interface";

export const LOGIN_INITIAL_STATE: LoginState = {
  username: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
};
