import { useEffect, useState } from "react";
import HeaderNavigation from "../../components/header-navigation/HeaderNavigation";
import "./Twitter.css";
import CustomInput from "../../components/custom-input/CustomInput";
import React from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import { API_METHODS, ENDPOINTS } from "../../common/constants/api.constants";
import TweetCard from "../../components/tweet/Tweet";
import { Tweet } from "../../common/interfaces/tweet.interface";
import { User } from "../../common/interfaces/user.interface";
import { TWEET_RESTRICTIONS } from "../../common/constants/restrictions.constants";
import { MESSAGE } from "../../common/constants/message.constant";
import { useSelector } from "react-redux";
import { ExtendedTweet } from "./interface/twitter.interface";
import { NEW_TWEET_INITIAL_STATE } from "./constant/twitter.constant";

const Twitter = () => {
  const userName = useSelector((state: any) => state.user.name);
  const userId = useSelector((state: any) => state.user.id);
  const [newTweet, setNewTweet] = useState<ExtendedTweet>(
    NEW_TWEET_INITIAL_STATE
  );
  const [error, setError] = useState<string>("");
  const [tweets, setTweets] = useState<ExtendedTweet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tweetsResponse = await fetch(`${ENDPOINTS.TWEETS}`);
      const tweets: Tweet[] = await tweetsResponse.json();
      const usersResponse = await fetch(`${ENDPOINTS.USERS}`);
      const users = await usersResponse.json();
      const extendedTweets = resolveAuthorNames(users, tweets);
      setTweets(extendedTweets);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setNewTweet({
      id: (tweets.length + 1).toString(),
      author_id: userId,
      text: "",
      author_name: userName,
    });
  }, [tweets]);

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

  const isTweetValid = (tweet: string) => {
    if (tweet.length < TWEET_RESTRICTIONS.minLenght) {
      setError(MESSAGE.TWEET_INVALID_MIN_LENGTH);
      return false;
    }
    if (tweet.length > TWEET_RESTRICTIONS.maxLength) {
      setError(MESSAGE.TWEET_INVALID_MAX_LENGTH);
      return false;
    }
    return true;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet((prev) => ({
      ...prev,
      text: event.target.value,
    }));
  };

  const createTweet = async () => {
    if (error) setError("");
    if (!isTweetValid(newTweet.text)) return;
    const data: Tweet = {
      id: newTweet.id,
      author_id: newTweet.author_id,
      text: newTweet.text,
    };
    const options = {
      method: API_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${ENDPOINTS.TWEETS}`, options);
    if (response.ok) {
      setTweets((prevTweets) => [newTweet, ...prevTweets]);
    }
  };

  return (
    <>
      <HeaderNavigation></HeaderNavigation>
      <main>
        <div className="new-tweet">
          <CustomInput
            value={newTweet.text}
            placeholder="What’s happening?"
            onTextAreaChange={handleInputChange}
            isRegularInput={false}
            error={error}
          ></CustomInput>
          <CustomButton label="Tweet" onClick={createTweet}></CustomButton>
        </div>
        <div className="tweets">
          {tweets.map((item, index) => (
            <TweetCard
              key={index}
              author={item.author_name}
              text={item.text}
            ></TweetCard>
          ))}
        </div>
      </main>
    </>
  );
};

export default Twitter;
