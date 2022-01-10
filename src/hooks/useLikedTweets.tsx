import { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"
import { homeLikedTweets, homeRetweetedTweets } from "../store/home/homeAction";
import { URL } from "../url";

const useLikedTweets = (user_id) => {
  const dispatch = useDispatch();
  const controller = new AbortController()
  const x = useSelector((state: RootStateOrAny) => state)

  function mapToObject(tweets, type) {
    let obj = {}
    if(type === 'liked') {
      tweets.map(tweet => {
        let temp = {
          tweet_id: tweet.tweet_id,
          liked: true,
        }
        obj[tweet.tweet_id] = temp;
      })
    }
    else if(type === 'retweeted') {
      tweets.map(tweet => {
        let temp = {
          tweet_id: tweet.tweet_id,
          retweeted: true,
        }
        obj[tweet.tweet_id] = temp;
      })
    }
    return obj;
  }

  useEffect(() => {
    if(user_id !== '') {
      Promise.all([
        fetch(URL + 'allLiked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id
          }),
          credentials: 'include',
          signal: controller.signal
        }),
  
        fetch(URL + 'allRetweeted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id
          }),
          credentials: 'include',
          signal: controller.signal
        })
      ])
      .then(responses =>
          Promise.all(responses.map(res => res.json()))
        ).then(res => {
          const obj_liked = mapToObject(res[0], 'liked')
          const obj_retweeted = mapToObject(res[1], 'retweeted')
          dispatch(homeLikedTweets(obj_liked));
          dispatch(homeRetweetedTweets(obj_retweeted));
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])
}

export default useLikedTweets