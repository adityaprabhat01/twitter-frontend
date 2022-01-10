import { Box } from "@chakra-ui/layout";
import { Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { postTweet, postTweetSuccess, postTweetFailure } from "../../store/tweet/tweetAction";

import { URL } from "../../url";

const TweetArea = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch();
  const [tweet, setTweet] = useState('')
  function handleTweetArea(event) {
    setTweet(event.target.value)
  }

  function handleSubmitTweetArea(event) {
    event.preventDefault();
    dispatch(postTweet())
    fetch(URL + 'postTweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tweet,
        user_id: x.auth.user_id,
        author_id: x.auth.user_id,
        name: x.auth.name,
        user_name: x.auth.user_name
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      res['comments'] = []
      dispatch(postTweetSuccess(res))
    })
    .catch(err => console.log(err))
  }

  return (
    <Box minWidth={'600px'}>
      <Textarea onChange={handleTweetArea} />
      <Button mt={2} onClick={handleSubmitTweetArea}>Tweet</Button>
    </Box>
  )
}

export default TweetArea;