import { useState, useEffect } from "react";
import { Tweet } from "../common/interfaces/tweet.interface";
import { User } from "../common/interfaces/user.interface";
import { ExtendedTweet } from "../pages/twitter/interface/twitter.interface";
import { apiService } from "../services/apiService";

const useTweets = () => {
  const [tweets, setTweets] = useState<ExtendedTweet[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweets: Tweet[] = await apiService.getAllTweets();
        const users = await apiService.getAllUsers();
        const extendedTweets = resolveAuthorNames(users, tweets);
        setTweets(extendedTweets);
      } catch (error: any) {
        setErrorMessage(error.message);
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

  return { tweets, errorMessage, setTweets };
};

export default useTweets;
