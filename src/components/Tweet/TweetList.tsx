import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { fetchTweets, fetchTweetsSuccess, fetchTweetsFailure } from '../../store/tweet/tweetAction'
import { URL } from "../../url";
import Tweet from "./Tweet";
import { useParams } from "react-router";

const TweetList = () => {
  let fetched = false;
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch()
  const params = useParams()
  
  type NoParams = {}
  type Params = { user_name: string }
  function isParams(params: Params | NoParams): params is Params {
    return (params as Params).user_name !== undefined
  }

  useEffect(() => {
    console.log(params)
    if(isParams(params)) {
      fetch(URL + 'ownTweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: x.auth.user_id,
          user_name: params.user_name
        })
      })
      .then(res => res.json())
      .then(res => {
        dispatch(fetchTweetsSuccess(res))
        fetched = true;
      })
      .catch(err => console.log(err))
    }
    
  }, [fetched])
  
  return (
    <div>
      TweetList
      {
        x.tweet.tweet_data.map(tweet => {
          return <Tweet tweet={tweet} />
        })
      }
      
    </div>
  )
}

export default TweetList;