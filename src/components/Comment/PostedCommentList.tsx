import { useSelector, RootStateOrAny } from "react-redux";
import PostedComment from "./PostedComment"
import { useLocation } from "react-router";

const PostedCommentList = (props) => {
  const { tweet } = props
  const x = useSelector((state: RootStateOrAny) => state)
  console.log(tweet, tweet.comments)
  const location = useLocation()
  const { pathname } = location
  return (
    <>

    { 
      pathname === '/homepage' ?
      tweet.comments.map(comment => <PostedComment comment={comment} />) :
      null
    }
    </>
  )
}

export default PostedCommentList;