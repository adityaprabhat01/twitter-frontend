import { Box } from "@chakra-ui/react"
import ReplyTextArea from "./ReplyTextArea";

const Reply = (props) => {
  const { tweet_id, comment_id, id_firestore, parentId, text } = props
  return (
    <>
      <Box>
        <ReplyTextArea tweet_id={tweet_id} comment_id={comment_id} id_firestore={id_firestore} parentId={parentId} text={text} />
      </Box>
    </>
  )
}

export default Reply;