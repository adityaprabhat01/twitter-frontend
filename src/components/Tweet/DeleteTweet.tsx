import { Button } from "@chakra-ui/react"
import { URL } from "../../url"
import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import { updateDeletedTweet } from "../../store/tweet/tweetAction"

const DeleteTweet = (props) => {
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch()
  function handleDelete() {
    fetch(URL + 'deleteTweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        profile_id: props.tweet.user_id,
        tweet_id: props.tweet.tweet_id,
        user_id: x.auth.user_id
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(updateDeletedTweet(res))
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  )
}

export default DeleteTweet