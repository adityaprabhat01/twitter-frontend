import { useEffect, useState } from "react"
import { URL } from "../../url";
import CommentTextArea from "./CommentTextArea"

const Comment = (props) => {
  const  { tweet } = props;
  const [count, setCount] = useState('');
  let fetched = false;
  useEffect(() => {
    if(tweet.tweet_id !== '') {
      fetch(URL + 'commentCount/' + tweet.tweet_id)
      .then(res => res.json())
      .then(res => {
        fetched = true
        setCount(res.comment_count)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [fetched])
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