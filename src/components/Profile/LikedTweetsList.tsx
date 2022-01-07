import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import Tweet from "../Tweet/Tweet";

const LikedTweetList = () => {
  let fetched = false;
  const x = useSelector((state: RootStateOrAny) => state)
  const [LikedTweets, setLikedTweets] = useState([])

  useEffect(() => {
    fetch(URL + 'likedTweetsWithDetails/' + x.auth.user_id, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      fetched = true;
      setLikedTweets(res)
    })
  }, [fetched])
  
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