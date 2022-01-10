import { Center, Divider, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useLikedTweets from "../../hooks/useLikedTweets";
import { homeFetchTweets, homeFetchTweetsSuccess, homeLikedTweets, homeRetweetedTweets } from "../../store/home/homeAction";
import { URL } from "../../url";
import Tweet from "./Tweet";

const HomeTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const controller = new AbortController()
  const user_id = x.auth.user_id
  useLikedTweets(user_id)

  useEffect(() => {
    dispatch(homeFetchTweets());
    fetch(URL + 'homeTweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: x.auth.user_id
      }),
      credentials: 'include',
      signal: controller.signal
    })
    .then(res => res.json())
    .then(res => {
      if(typeof res === 'object' && res.redirect === true) {
        history.push('/signin')
      }
      let data: any = []
      res.map(val => {
        const {
          following_id,
          tweet_id,
          tweet,
          posted_on,
          likes_count,
          retweet_count,
          comment_count,
          name,
          email,
          username,
          author_id
      } = val
      const y = {
          following_id,
          tweet_id,
          tweet,
          posted_on,
          likes_count,
          comment_count,
          retweet_count,
          name,
          email,
          username,
          author_id,
          comments: []
      }
        data.push(y)
      })
      dispatch(homeFetchTweetsSuccess(data))
      setLoading(false)
    })
  }, [])
  return (
    <>
      <Center>
        {
          loading === true ? <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        /> :
          <Stack border={'2px'} alignItems={"center"} maxWidth={'600px'}>
              {
                x.home.tweets.map(tweet => {
                  return (
                    <>
                      <Tweet tweet={tweet} />
                      <Divider />
                    </>
                  )
                })
              }
          </Stack>
        }
        
      </Center>
    </>
  )
}

export default HomeTweetList;