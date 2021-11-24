import Like from "../Like/Like";
import Retweet from "../Retweet/Retweet";
import { Box, Flex } from "@chakra-ui/react"
import CommentTextArea from "../Comment/CommentTextArea";
import ThreadButton from "../Button/ThreadButton";

const Tweet = (props: any) => {
  const { tweet } = props;
  return (
    <Box border={"2px"} width={"350px"}>
      <span>
        <b>{ tweet.name }</b>&nbsp;
        <b>{ tweet.username }</b>
      </span>
      <br />
      { tweet.tweet }
      <br />
      <Flex justifyContent="space-between">
        <Like tweet={tweet} />
        <Retweet tweet={tweet} />
        <CommentTextArea tweet={tweet} />
        <ThreadButton tweet={tweet} />
      </Flex>
      
    </Box>
  )
}

export default Tweet;