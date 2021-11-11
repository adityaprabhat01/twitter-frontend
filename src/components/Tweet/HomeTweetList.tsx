import { useEffect } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { homeFetchTweets, homeFetchTweetsSuccess, homeLikedTweets, homeRetweetedTweets } from "../../store/home/homeAction";
import { URL } from "../../url";
import Tweet from "./Tweet";

const HomeTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch();
  let fetched = false;

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
    dispatch(homeFetchTweets());

    Promise.all([
      fetch(URL + 'allLiked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: x.auth.user_id
        })
      }),
      fetch(URL + 'allRetweeted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: x.auth.user_id
        })
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