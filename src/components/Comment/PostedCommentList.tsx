import { useSelector, RootStateOrAny } from "react-redux";
import PostedComment from "./PostedComment"
import { useLocation } from "react-router";

const PostedCommentList = (props) => {
  const { tweet } = props
  const location = useLocation()
  const { pathname } = location
  return (
    <>

    { 
      pathname === '/homepage' || pathname.includes('/profile') === true ?
      tweet.comments.map(comment => <PostedComment comment={comment} />) :
      null
    }
    </>
  )
}

export default PostedCommentList;