import { Tweet } from "../../../common/interfaces/tweet.interface";
import { FieldState } from "../../../common/interfaces/field.interface";

export interface ExtendedTweet extends Tweet {
  author_name: string;
}

export interface TwitterState {
  newTweet: FieldState;
}
