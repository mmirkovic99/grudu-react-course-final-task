import { useContext, useEffect, useState } from "react";
import HeaderNavigation from "../../components/header-navigation/HeaderNavigation";
import "./Twitter.css";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";
import TweetCard from "../../components/tweet/Tweet";
import { Tweet } from "../../common/interfaces/tweet.interface";
import { User } from "../../common/interfaces/user.interface";
import { ExtendedTweet } from "./interface/twitter.interface";
import { NEW_TWEET_INIT_STATE } from "./constant/twitter.constant";
import { apiService } from "../../services/apiService";
import useInputHandlers from "../../hooks/InputHandlers";
import { validatorService } from "../../services/validatorService";
import { UserContext } from "../../context/UserContext";

const Twitter = () => {
  const [newTweetState, setNewTweetState] = useState(NEW_TWEET_INIT_STATE);
  const [tweets, setTweets] = useState<ExtendedTweet[]>([]);
  const { handleInputChange, resetErrorMessages, resetState, setError } =
    useInputHandlers(newTweetState, setNewTweetState);
  const { user } = useContext(UserContext) || { user: null };
  const [commonErrorMessage, setCommonErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweets: Tweet[] = await apiService.getAllTweets();
        const users = await apiService.getAllUsers();
        const extendedTweets = resolveAuthorNames(users, tweets);
        setTweets(extendedTweets);
      } catch (error: any) {
        setCommonErrorMessage(error.message);
      }
    };
    fetchData();
  }, []);

  const resolveAuthorNames = (users: User[], tweets: Tweet[]) => {
    const tweetsWithFullAuthorName: ExtendedTweet[] = [];
    if (users?.length && tweets?.length) {
      const userNamesMap = new Map<string, string>();
      users.forEach((user) => {
        userNamesMap.set(user.id, user.name);
      });
      tweets.forEach((tweet) => {
        const userName = userNamesMap.get(tweet.author_id);
        if (userName)
          tweetsWithFullAuthorName.push({
            ...tweet,
            author_name: userName,
          });
      });
    }
    return tweetsWithFullAuthorName.reverse();
  };

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
        setTweets((prev) => [extendedTweet, ...prev]);
        resetState();
      } else {
        setError("newTweet", tweetMessage);
      }
    } catch (error: any) {
      setCommonErrorMessage(error.message);
    }
  };

  return (
    <>
      <HeaderNavigation />
      <main className="twitter-contet">
        {commonErrorMessage && (
          <span className="twitter-contet__error">{commonErrorMessage}</span>
        )}
        <div className="new-tweet">
          <CustomInput
            value={newTweetState.newTweet.value}
            placeholder="What’s happening?"
            onTextAreaChange={(event) => handleInputChange("newTweet", event)}
            isRegularInput={false}
            error={newTweetState.newTweet.error}
          />
          <CustomButton label="Tweet" onClick={createTweet} />
        </div>
        {tweets.map((item, index) => (
          <TweetCard key={index} author={item.author_name} text={item.text} />
        ))}
      </main>
    </>
  );
};

export default Twitter;
