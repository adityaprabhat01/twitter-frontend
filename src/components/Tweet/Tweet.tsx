import Like from "../Like/Like";

const Tweet = (props: any) => {
  const { tweet } = props;
  return (
    <div>
      { tweet.tweet }
      <Like tweet={tweet} />
    </div>
  )
}

export default Tweet;