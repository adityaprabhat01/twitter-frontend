import React from "react";
import { POST_TWEET, POST_TWEET_FAILURE, POST_TWEET_SUCCESS, FETCH_TWEETS, FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILURE } from "./tweetTypes";

const initState = {
  tweet_data: [{
    tweet: '',
    tweet_id: '',
  }],
  loading: false,
  error: ''
}

const tweetReducer = (state = initState, action: { 
  type: string; 
  payload: {
    tweet_data: {
      tweet_id: string,
      tweet: string
    }[];
    error: string;
    loading: boolean 
  }}) => {
  switch(action.type) {
    case POST_TWEET: return {
      ...state,
      loading: true
    }
    case POST_TWEET_SUCCESS: return {
      ...state,
      loading: false,
      tweet_data: [...(state.tweet_data),
        action.payload
      ]
    }
    case POST_TWEET_FAILURE: return {
      ...state,
      loading: false,
      error: action.payload.error
    }
    case FETCH_TWEETS: return {
      ...state,
      loading: true
    }
    case FETCH_TWEETS_SUCCESS: return {
      ...state,
      loading: false,
      tweet_data: action.payload
    }
    case FETCH_TWEETS_FAILURE: return {
      ...state,
      loading: false,
      error: action.payload.error
    }
    default: return state
  }
}

export default tweetReducer;