import { Box } from "@chakra-ui/layout";
import { Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postTweet, postTweetSuccess } from "../../store/tweet/tweetAction";

import { URL } from "../../url";
import TwitterButton from "../UI/TwitterButton";

const style = {
  mt: 2
}

const TweetArea = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    const name = state.auth.user_name
    const user_name = state.auth.name
    return { user_id, user_name, name }
  }
  const store = useSelector(handleSelector)
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
        user_id: store.user_id,
        author_id: store.user_id,
        name: store.name,
        user_name: store.user_name
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
      <TwitterButton method={handleSubmitTweetArea} text={"Tweet"} style={style} />
    </Box>
  )
}

export default TweetArea;