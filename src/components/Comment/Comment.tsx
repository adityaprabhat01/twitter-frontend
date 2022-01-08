import { Box } from "@chakra-ui/layout";
import { useState } from "react"
import CommentTextArea from "./CommentTextArea"

const Comment = (props) => {
  const  { tweet } = props;
  const [count, setCount] = useState(tweet.comment_count);

  return (
    <>
      <CommentTextArea props={props} setCount={setCount} count={count} />
      <Box mt={4}>
        {
          count 
        }
      </Box>
    </>
  )
}

export default Comment