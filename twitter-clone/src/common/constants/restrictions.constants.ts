import { Restriction } from "../interfaces/restriction.interface";

export const PASSWORD_RESTRICTIONS: Restriction = {
  minLenght: 8,
  maxLength: 256,
};

export const FULL_NAME_RESTRICTIONS: Restriction = {
  minLenght: 1,
  maxLength: 512,
};

export const TWEET_RESTRICTIONS: Restriction = {
  minLenght: 1,
  maxLength: 140,
};
