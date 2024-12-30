import { MESSAGE } from "../common/constants/message.constant";
import { EMAIL_REGEX } from "../common/constants/regex.constants";
import {
  FULL_NAME_RESTRICTIONS,
  PASSWORD_RESTRICTIONS,
  TWEET_RESTRICTIONS,
} from "../common/constants/restrictions.constants";
import { User } from "../common/interfaces/user.interface";
import { apiService } from "./apiService";

export const validatorService = {
  checkEmailAddress(email: string) {
    if (!email) {
      return MESSAGE.EMAIL_REQUIRED;
    }
    if (!EMAIL_REGEX.test(email)) {
      return MESSAGE.EMAIL_INVALID;
    }
    return "";
  },
  checkPassword(password: string, deepCheck = false) {
    if (password.length < PASSWORD_RESTRICTIONS.minLenght) {
      return MESSAGE.PASSWORD_INVALID_MIN_LENGTH;
    }
    if (password.length > PASSWORD_RESTRICTIONS.maxLength && deepCheck) {
      return MESSAGE.PASSWORD_INVALID_MIN_LENGTH;
    }
    return "";
  },
  async checkUsername(username: string, deepCheck = false) {
    try {
      if (!username) return MESSAGE.USERNAME_REQUIRED;
      if (deepCheck) {
        const users: User[] = await apiService.getAllUsers();
        let isUsernameAvailable = true;
        if (users?.length) {
          isUsernameAvailable = !users.find((user) => user.id === username);
        }
        return isUsernameAvailable ? "" : MESSAGE.USERNAME_NOT_AVAILABLE;
      }
      return "";
    } catch (error) {
      console.log(error);
    }
  },
  checkFullName(fullName: string) {
    if (fullName.length < FULL_NAME_RESTRICTIONS.minLenght) {
      return MESSAGE.FULL_NAME_INVALID_MIN_LENGTH;
    }
    if (fullName.length > FULL_NAME_RESTRICTIONS.maxLength) {
      return MESSAGE.FULL_NAME_INVALID_MAX_LENGTH;
    }
    return "";
  },
  checkTweet(tweet: string) {
    if (tweet.length < TWEET_RESTRICTIONS.minLenght) {
      return MESSAGE.TWEET_INVALID_MIN_LENGTH;
    }
    if (tweet.length > TWEET_RESTRICTIONS.maxLength) {
      return MESSAGE.TWEET_INVALID_MAX_LENGTH;
    }
    return "";
  },
};
