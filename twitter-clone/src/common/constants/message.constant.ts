export enum MESSAGE {
  EMAIL_REQUIRED = "Email address is required field.",
  EMAIL_INVALID = "Invalid email address.",
  FULL_NAME_REQUIRED = "Full Name is required field.",
  FULL_NAME_INVALID_MIN_LENGTH = "Invalid full name. Full name must contain at least one symbol",
  FULL_NAME_INVALID_MAX_LENGTH = "Invalid full name. Full name must contain at most 512 symbols",
  PASSWORD_REQUIRED = "Password is required field.",
  PASSWORD_INVALID = "Invalid password.",
  PASSWORD_INVALID_MIN_LENGTH = "Invalid password.",
  PASSWORD_INVALID_MAX_LENGTH = "Invalid password.",
  USERNAME_REQUIRED = "Username is required field.",
  USERNAME_NOT_AVAILABLE = "Username is not available.",
  USERNAME_INVALID = "Invalid username.",
  USERNAME_PASSWORD_INVLAID = "Invalid username or password.",
  TWEET_INVALID_MIN_LENGTH = "Invalid tweet. Tweet must contain at least one symbol.",
  TWEET_INVALID_MAX_LENGTH = "Invalid tweet. Tweet must contain at most 140 symbols.",
}
