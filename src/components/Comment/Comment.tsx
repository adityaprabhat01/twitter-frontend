import { Box, HStack } from "@chakra-ui/layout";
import { useState } from "react"
import CommentTextArea from "./CommentTextArea"

const Comment = (props) => {
  const  { tweet } = props;
  const [count, setCount] = useState(tweet.comment_count);

  return (
    <>
      <HStack>
        <CommentTextArea props={props} setCount={setCount} count={count} />
        <Box as='span'>
          {
            count 
          }
        </Box>
      </HStack>
      
    </>
  )
}

export default Comment