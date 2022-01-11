import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Tweet from "../Tweet/Tweet";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Center, Divider, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router";
import useLikedTweets from "../../hooks/useLikedTweets";
import { fetchLikedSuccess } from "../../store/liked/likedAction";

const LikedTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const [LikedTweets, setLikedTweets] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const dispatch = useDispatch()
  type Params = { user_id: string };
  type NoParams = {};
  function isParams(params: Params | NoParams): params is Params {
    return (params as Params).user_id !== undefined;
  }

  function getUser_id() {
    if(isParams(params)) {
      return params.user_id
    }
    return ''
  }
  
  useAuthCookies()
  useLikedTweets(x.auth.user_id)

  const controller = new AbortController()
  useEffect(() => {
    if(isParams(params)) {
      fetch(URL + 'likedTweetsWithDetails/' + params.user_id, {
        credentials: 'include',
        signal: controller.signal
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchLikedSuccess(res))
        setLikedTweets(res)
        setLoading(false)
      })
    }
    
    return () => {
      controller.abort()
    }
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
          <Stack border={"2px"} alignItems={"center"} maxWidth={'600px'} mt={2} mb={2}>
            Liked Tweets
            {
              x.liked.tweet_data.map((tweet: any) => {
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

export default LikedTweetList;