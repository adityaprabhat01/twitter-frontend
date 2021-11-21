import Like from "../Like/Like";
import Retweet from "../Retweet/Retweet";

const Tweet = (props: any) => {
  const { tweet } = props;
  return (
    <div>
      <span>
        <b>{ tweet.name }</b>&nbsp;
        <b>{ tweet.username }</b>
      </span>
      <br />
      { tweet.tweet }

      <Like tweet={tweet} />
      <Retweet tweet={tweet} />
    </div>
  )
}

export default Tweet;