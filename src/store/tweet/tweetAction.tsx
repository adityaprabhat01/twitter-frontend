import { POST_TWEET, POST_TWEET_FAILURE, POST_TWEET_SUCCESS, FETCH_TWEETS, FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILURE, UPDATE_DELETED_TWEET } from "./tweetTypes";

export const postTweetSuccess = (data: any) => {
  return {
    type: POST_TWEET_SUCCESS,
    payload: data
  }
}

export const postTweet = () => {
  return {
    type: POST_TWEET
  }
}

export const postTweetFailure = () => {
  return {
    type: POST_TWEET_FAILURE
  }
}

export const fetchTweets = () => {
  return {
    type: FETCH_TWEETS
  }
}

export const fetchTweetsSuccess = (data) => {
  return {
    type: FETCH_TWEETS_SUCCESS,
    payload: data
  }
}

export const fetchTweetsFailure = () => {
  return {
    type: FETCH_TWEETS_FAILURE
  }
}

export const updateDeletedTweet = (data) => {
  return {
    type: UPDATE_DELETED_TWEET,
    payload: data
  }
}