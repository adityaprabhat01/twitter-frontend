import React from "react";

const Tweet = (props: any) => {
  console.log(props)
  const { tweet } = props;
  return (
    <div>
      { tweet.tweet }
    </div>
  )
}

export default Tweet;