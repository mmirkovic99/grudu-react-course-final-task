import { Tweet } from "../../../common/interfaces/tweet.interface";

export interface ExtendedTweet extends Tweet {
  author_name: string;
}
