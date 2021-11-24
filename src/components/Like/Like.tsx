import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { homeAddLikedTweets, homeRemoveLikedTweets } from "../../store/home/homeAction";
import { Button } from "@chakra-ui/react";

const Like = (props) => {
  const x = useSelector((state: RootStateOrAny) => state)
  const { tweet } = props
  const { following_id, tweet_id, author_id } = tweet
  const likedStatus = x.home.liked;
  const dispatch = useDispatch()

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
      })
    })
    .then(res => res.json())
    .then(res => {
      const { tweet_id, status } = res;
      const obj = {
        tweet_id,
        liked: status,
      }
      dispatch(homeAddLikedTweets(obj))
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
      })
    })
    .then(res => res.json())
    .then(res => {
      const { tweet_id, status } = res;
      dispatch(homeRemoveLikedTweets(tweet_id))
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      {
        likedStatus[tweet.tweet_id] === undefined ? 
          <Button onClick={handleLike}>
            Like
          </Button> :
          <Button onClick={handleUnlike}>Unlike</Button>
      }
    </>
  )
}

export default Like;