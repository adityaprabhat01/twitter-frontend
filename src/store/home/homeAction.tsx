import { HOME_FETCH_TWEETS, HOME_FETCH_TWEETS_SUCCESS, HOME_FETCH_TWEETS_FAILURE, HOME_ADD_LIKED_TWEETS, HOME_REMOVE_LIKED_TWEETS, HOME_LIKED_TWEETES, HOME_RETWEETED_TWEETES, HOME_ADD_RETWEETED_TWEETS, HOME_REMOVE_RETWEETED_TWEETS, HOME_POST_COMMENT } from "./homeType";

export const homeFetchTweets = () => {
  return {
    type: HOME_FETCH_TWEETS
  }
}

export const homeFetchTweetsSuccess = (data) => {
  return {
    type: HOME_FETCH_TWEETS_SUCCESS,
    payload: data
  }
}

export const homeFetchTweetsFailure = () => {
  return {
    type: HOME_FETCH_TWEETS_FAILURE
  }
}

export const homeLikedTweets = (data) => {
  return {
    type: HOME_LIKED_TWEETES,
    payload: data
  }
}

export const homeAddLikedTweets = (data) => {
  return {
    type: HOME_ADD_LIKED_TWEETS,
    payload: data
  }
} 

export const homeRemoveLikedTweets = (data) => {
  return {
    type: HOME_REMOVE_LIKED_TWEETS,
    payload: data
  }
}

export const homeRetweetedTweets = (data) => {
  return {
    type: HOME_RETWEETED_TWEETES,
    payload: data
  }
}

export const homeAddRetweetedTweets = (data) => {
  return {
    type: HOME_ADD_RETWEETED_TWEETS,
    payload: data
  }
}

export const homeRemoveRetweetedTweets = (data) => {
  return {
    type: HOME_REMOVE_RETWEETED_TWEETS,
    payload: data
  }
}

export const homePostComment = (data) => {
  return {
    type: HOME_POST_COMMENT,
    payload: data
  }
}