import React from "react";

const Tweet = (props: any) => {
  const { tweet } = props;
  return (
    <div>
      { tweet.tweet }
    </div>
  )
}

export default Tweet;