import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import Tweet from "../Tweet/Tweet";
import useAuthCookies from "../../hooks/useAuthCookies";

const LikedTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const [LikedTweets, setLikedTweets] = useState([])
  useAuthCookies()
  const controller = new AbortController()
  useEffect(() => {
    fetch(URL + 'likedTweetsWithDetails/' + x.profile.user_id, {
      credentials: 'include',
      signal: controller.signal
    })
    .then(res => res.json())
    .then(res => {
      setLikedTweets(res)
    })

    return () => {
      controller.abort()
    }
  }, [])
  
  return (
    <>
      Liked Tweets
      {
        LikedTweets.map((tweet: any) => {
          return (
            <Tweet tweet={tweet} />
          )
        })
      }
    </>
  )
}

export default LikedTweetList;