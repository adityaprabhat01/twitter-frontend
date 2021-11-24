import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { homeAddRetweetedTweets, homeRemoveRetweetedTweets } from "../../store/home/homeAction";
import { Button } from "@chakra-ui/react";

const Retweet = (props) => {
  const x = useSelector((state: RootStateOrAny) => state)
  const { tweet } = props;
  const { following_id, tweet_id, author_id } = tweet;
  const retweetedStatus = x.home.retweeted
  const dispatch = useDispatch();
  function handleRetweet() {
    fetch(URL + 'retweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id: author_id,
        tweet_id
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      const { tweet_id, status } = res;
      const obj = {
        tweet_id,
        liked: status,
      }
      dispatch(homeAddRetweetedTweets(obj))
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  function handleUnretweet() {
    fetch(URL + 'unretweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id: author_id,
        tweet_id
      })
    })
    .then(res => res.json())
    .then(res => {
      const { tweet_id, status } = res;
      dispatch(homeRemoveRetweetedTweets(tweet_id))
    })
    .catch(err => {
      console.log(err)
    })
  }
  

  return (
    <>
      {
        retweetedStatus[tweet.tweet_id] === undefined ? 
          <Button onClick={handleRetweet}>
            Retweet
          </Button> :
          <Button onClick={handleUnretweet}>Unretweet</Button>
      }
    </>
  )
}

export default Retweet;