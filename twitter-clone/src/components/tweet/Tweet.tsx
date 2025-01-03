import styles from "../../styles/Tweet.module.css";
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
    <div className={styles.tweet}>
      <div className={styles.tweetAvatarWrapper}>
        <div className={styles.tweetAvatar}>{getAuthorsInitials()}</div>
      </div>
      <div className={styles.tweetContent}>
        <div className={styles.tweetAuthor}>{author}</div>
        <div
          className={styles.tweetText}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        ></div>
      </div>
    </div>
  );
};

export default TweetCard;
