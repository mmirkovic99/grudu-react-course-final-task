import { useState } from "react";
import { NEW_TWEET_INIT_STATE } from "../pages/twitter/constant/twitter.constant";
import { apiService } from "../services/apiService";
import { validatorService } from "../services/validatorService";
import useInputHandlers from "./useInputHandlers";
import { User } from "../common/interfaces/user.interface";
import { Tweet } from "../common/interfaces/tweet.interface";

const useCreateTweet = (tweets: Tweet[], setTweets: any, user: User | null) => {
  const [newTweetState, setNewTweetState] = useState(NEW_TWEET_INIT_STATE);
  const { handleInputChange, resetErrorMessages, resetState, setError } =
    useInputHandlers(newTweetState, setNewTweetState);
  const [commonErrorMessage, setCommonErrorMessage] = useState<string>("");

  const createTweet = async () => {
    try {
      resetErrorMessages();
      const { newTweet } = newTweetState;
      const tweetMessage = validatorService.checkTweet(newTweet.value);
      if (!tweetMessage) {
        const tweet = {
          id: (tweets.length + 1).toString(),
          author_id: user?.id || "",
          text: newTweet.value,
        };
        await apiService.saveTweet(tweet);
        const extendedTweet = {
          ...tweet,
          author_name: user?.name || "",
        };
        setTweets((prev: Tweet[]) => [extendedTweet, ...prev]);
        resetState();
      } else {
        setError("newTweet", tweetMessage);
      }
    } catch (error: any) {
      setCommonErrorMessage(error.message);
    }
  };

  return {
    newTweetState,
    handleInputChange,
    createTweet,
    commonErrorMessage,
  };
};

export default useCreateTweet;
