import Like from "../Like/Like";
import Retweet from "../Retweet/Retweet";
import { Box, Flex } from "@chakra-ui/react"
import ThreadButton from "../Button/ThreadButton";
import DeleteTweet from "./DeleteTweet";
import Comment from "../Comment/Comment";
import PostedCommentList from "../Comment/PostedCommentList";
import { useHistory } from "react-router";
import { URL } from "../../url";

const Tweet = (props: any) => {
  const { tweet } = props;
  const history = useHistory()
  
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + 'checkExistence/' + tweet.username, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.found === true) {
        history.push('/profile/' + tweet.username)
      }
    })
  }
  
  return (
    <Box border={"2px"} width={"350px"}>
      <span onClick={handleSubmit}>
        <b>{ tweet.name }</b>&nbsp;
        <b>{ tweet.username }</b>
      </span>
      <br />
      { tweet.tweet }
      <br />
      <Flex justifyContent="space-between">
        <Like tweet={tweet} />
        <Retweet tweet={tweet} />
        <Comment tweet={tweet} />
        <ThreadButton tweet={tweet} />
        <DeleteTweet tweet={tweet} />
      </Flex>
      <PostedCommentList tweet={tweet} />
    </Box>
  )
}

export default Tweet;