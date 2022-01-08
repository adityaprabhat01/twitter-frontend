import { useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { homeAddLikedTweets, homeRemoveLikedTweets } from "../../store/home/homeAction";
import { Box } from "@chakra-ui/react";
import { URL } from "../../url";

const Like = (props) => {
  const x = useSelector((state: RootStateOrAny) => state)
  const { tweet } = props
  const { tweet_id, author_id } = tweet
  const likedStatus = x.home.liked;
  const dispatch = useDispatch()
  const [count, setCount] = useState(tweet.likes_count);

  function handleLike() {
    fetch(URL + "like", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id,
        tweet_id
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      const { tweet_id, status } = res;
      const obj = {
        tweet_id,
        liked: status,
      }
      dispatch(homeAddLikedTweets(obj))
      setCount(count+1);
    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleUnlike() {
    fetch(URL + "unlike", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id,
        tweet_id: tweet_id
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      const { tweet_id, status } = res;
      dispatch(homeRemoveLikedTweets(tweet_id))
      setCount(count-1)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      {
        likedStatus[tweet.tweet_id] === undefined ? 
          <Box mt={"4"} onClick={handleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
          </Box> :
          <Box mt={"4"} onClick={handleUnlike}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
          </Box>
      }
      {
        count
      }
    </>
  )
}

export default Like;