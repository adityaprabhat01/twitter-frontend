import Like from "../Like/Like";
import Retweet from "../Retweet/Retweet";

const Tweet = (props: any) => {
  const { tweet } = props;
  return (
    <div>
      { tweet.tweet }
      <Like tweet={tweet} />
      <Retweet tweet={tweet} />
    </div>
  )
}

export default Tweet;