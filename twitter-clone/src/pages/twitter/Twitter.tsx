import { useContext } from "react";
import HeaderNavigation from "../../components/header-navigation/HeaderNavigation";
import "./Twitter.css";
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
      <main className="twitter-contet">
        {(errorMessage || commonErrorMessage) && (
          <span className="twitter-contet__error">
            {errorMessage || commonErrorMessage}
          </span>
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
