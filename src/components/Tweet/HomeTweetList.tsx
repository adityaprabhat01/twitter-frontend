import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { homeFetchTweets, homeFetchTweetsSuccess, homeLikedTweets } from "../../store/home/homeAction";
import { fetchProfileSuccess } from "../../store/profile/profileAction";
import { URL } from "../../url";
import Tweet from "./Tweet";

const HomeTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch();
  let fetched = false;

  function mapToObject(tweets) {
    let obj = {}
    tweets.map(tweet => {
      let temp = {
        tweet_id: tweet.tweet_id,
        liked: true
      }
      
      obj[tweet.tweet_id] = temp;
    })
    return obj;
  }

  useEffect(() => {
    dispatch(homeFetchTweets());

    fetch(URL + 'allLiked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: x.auth.user_id
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      const obj = mapToObject(res);
      dispatch(homeLikedTweets(obj))
    })
    .catch(err => {
      console.log(err)
    })

    fetch(URL + 'homeTweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: x.auth.user_id
      })
    })
    .then(res => res.json())
    .then(res => {
      let data: any = []
      res.map(val => {
        const {
          following_id,
          tweet_id,
          tweet,
          posted_on,
          likes_count,
          retweet_count,
          name,
          email,
          username
      } = val
      const y = {
          following_id,
          tweet_id,
          tweet,
          posted_on,
          likes_count,
          retweet_count,
          name,
          email,
          username
      }
        data.push(y)
      })
      dispatch(homeFetchTweetsSuccess(data))
      fetched = true;
    })
  }, [fetched])
  return (
    <div> 
      HomeTweets
      {
        x.home.tweets.map(tweet => {
          return <Tweet tweet={tweet} />
        })
      }
    </div>
  )
}

export default HomeTweetList;