import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { homeAddRetweetedTweets, homeRemoveRetweetedTweets } from "../../store/home/homeAction";
import { Box, Button } from "@chakra-ui/react";

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
      }),
      credentials: 'include'
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
      }),
      credentials: 'include'
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
          <Box mt={"4"} onClick={handleRetweet}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
            </svg>
          </Box> :
          <Button onClick={handleUnretweet}>Unretweet</Button>
      }
    </>
  )
}

export default Retweet;