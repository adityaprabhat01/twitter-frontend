import { useSelector, RootStateOrAny } from "react-redux";
import PostedComment from "./PostedComment"

const PostedCommentList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  console.log(x.thread.comments)
  return (
    <>
    {
      x.thread.comments.map(comment => {
        <PostedComment comment={comment} />
      })
    }
    </>
  )
}

export default PostedCommentList;