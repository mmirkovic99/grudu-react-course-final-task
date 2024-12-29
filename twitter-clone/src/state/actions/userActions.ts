import { User } from "../../common/interfaces/user.interface";
import { SET_USER } from "../types";

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});
