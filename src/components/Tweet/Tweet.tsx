import Like from "../Like/Like";
import Retweet from "../Retweet/Retweet";
import { Box, Flex } from "@chakra-ui/react";
import ThreadButton from "../Button/ThreadButton";
import DeleteTweet from "./DeleteTweet";
import Comment from "../Comment/Comment";
import PostedCommentList from "../Comment/PostedCommentList";
import { useHistory } from "react-router";
import { URL } from "../../url";
import User from "../UI/User";
import moment from 'moment';

const Tweet = (props: any) => {
  const { tweet } = props;
  const history = useHistory();
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + "checkExistence/" + tweet.username, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.found === true) {
          history.push("/profile/" + tweet.username);
        }
      });
  }

  const ago = moment(tweet.posted_on).fromNow()
  return (
    <Box minWidth={"600px"} padding={2}>
      <User
        user_id={tweet.user_id}
        author_id={tweet.author_id}
        name={tweet.name}
        user_name={tweet.username}
        tweet_id={tweet.tweet_id}
        handleSubmit={handleSubmit}
        ago={ago}
      />
      <Box mt={1}>
        {tweet.tweet}
      </Box>
      <Flex mt={1} justifyContent="space-between">
        <Like tweet={tweet} />
        <Retweet tweet={tweet} />
        <Comment tweet={tweet} />
        <ThreadButton tweet={tweet} />
        <DeleteTweet tweet={tweet} />
      </Flex>
      <PostedCommentList tweet={tweet} />
    </Box>
  );
};

export default Tweet;
