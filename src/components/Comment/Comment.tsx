import { useState } from "react"
import CommentTextArea from "./CommentTextArea"

const Comment = (props) => {
  const  { tweet } = props;
  const [count, setCount] = useState(tweet.comment_count);

  return (
    <>
      <CommentTextArea props={props} setCount={setCount} count={count} />
      {
        count 
      }
    </>
  )
}

export default Comment