import { useContext } from "react";
import HeaderNavigation from "../../components/header-navigation/HeaderNavigation";
import twitterStyles from "../../styles/Twitter.module.css";
import errorStyles from "../../styles/Twitter.module.css";
import CustomInput from "../../components/custom-input/CustomInput";
import CustomButton from "../../components/custom-button/CustomButton";
import TweetCard from "../../components/tweet/Tweet";
import { UserContext } from "../../context/UserContext";
import useTweets from "../../hooks/useExtendedTweets";
import useCreateTweet from "../../hooks/useCreateTweet";

const Twitter = () => {
  const { user } = useContext(UserContext) || { user: null };
  const { tweets, errorMessage, setTweets } = useTweets();
  const { newTweetState, handleInputChange, createTweet, commonErrorMessage } =
    useCreateTweet(tweets, setTweets, user);

  return (
    <>
      <HeaderNavigation userFullName={user?.name} />
      <main className={twitterStyles.twitterContet}>
        {(errorMessage || commonErrorMessage) && (
          <span className={errorStyles.contetError}>
            {errorMessage || commonErrorMessage}
          </span>
        )}
        <div>
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
