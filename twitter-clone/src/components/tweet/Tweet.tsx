import "./Tweet.css";
import DOMPurify from "dompurify";

const TweetCard = ({ author = "", text = "" }) => {
  const getAuthorsInitials = () => {
    const spaceIndex = author.indexOf(" ");
    const authorsInitials = `${author.charAt(0)}${author.charAt(
      spaceIndex + 1
    )}`;
    return authorsInitials;
  };
  return (
    <div className="tweet">
      <div className="tweet__avatar-wrapper">
        <div className="tweet__avatar">{getAuthorsInitials()}</div>
      </div>
      <div className="tweet__content">
        <div className="tweet__author">{author}</div>
        <div
          className="tweet__text"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        ></div>
      </div>
    </div>
  );
};

export default TweetCard;
