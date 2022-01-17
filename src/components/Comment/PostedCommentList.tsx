import PostedComment from "./PostedComment"
import { useLocation } from "react-router";

const PostedCommentList = (props) => {
  const { tweet } = props
  const location = useLocation()
  const { pathname } = location
  console.log(tweet)
  return (
    <>
      { tweet.comments !== undefined ? 
        (pathname === '/homepage' || pathname.includes('/profile') === true  || pathname.includes('/thread') === true || pathname.includes('/LikedTweetsList') === true ?
        tweet.comments.map(comment => <PostedComment comment={comment} />) :
        null) :
        null
      }
    </>
  )
}

export default PostedCommentList;