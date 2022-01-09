import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { fetchTweets, fetchTweetsSuccess, fetchTweetsFailure } from '../../store/tweet/tweetAction'
import { URL } from "../../url";
import Tweet from "./Tweet";
import { useParams, useHistory } from "react-router";
import { Center, Divider, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";

const TweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  type NoParams = {}
  type Params = { user_name: string }
  function isParams(params: Params | NoParams): params is Params {
    return (params as Params).user_name !== undefined
  }
  const history = useHistory()
  const controller = new AbortController()

  useEffect(() => {
    if(isParams(params)) {

      Promise.all([
        fetch(URL + 'ownTweets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: x.auth.user_name === params.user_name ? x.auth.user_id : '',
            user_name: params.user_name
          }),
          credentials: 'include',
          signal: controller.signal
        }),

        fetch(URL + 'ownRetweetedTweets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: x.auth.user_name === params.user_name ? x.auth.user_id : '',
            user_name: params.user_name
          }),
          credentials: 'include',
          signal: controller.signal
        })
      ])
      .then(responses =>
        Promise.all(responses.map(res => res.json()))
      )
      .then(res => {
        for(let i=0;i<res[1].length;i++) {
          res[0].push(res[1][i])
        }
        dispatch(fetchTweetsSuccess(res[0]));
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
    }

    return () => {
      controller.abort()
      setLoading(true)
    }
  }, [history.location.pathname])
  
  return (
    <>
      <Center>
        <Stack border={"2px"} alignItems={"center"} spacing={4} maxWidth={'600px'}>
            <div>TweetList</div>
              {
                loading === true ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              /> :
                x.tweet.tweet_data.map(tweet => {
                  return (
                    <>
                      <Tweet tweet={tweet} />
                      <Divider />
                    </>
                  )
                })
              }      
          </Stack>
      </Center>
    </>
    
  )
}

export default TweetList;