import { POST_TWEET, POST_TWEET_FAILURE, POST_TWEET_SUCCESS, FETCH_TWEETS, FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILURE, UPDATE_DELETED_TWEET } from "./tweetTypes";

const initState = {
  tweet_data: [{
    tweet: '',
    tweet_id: '',
  }],
  retweet_data: [{
    tweet: '',
    tweet_id: '',
  }],
  loading: false,
  error: ''
}

const tweetReducer = (state = initState, action) => {
  switch(action.type) {
    case POST_TWEET: return {
      ...state,
      loading: true,
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
    case UPDATE_DELETED_TWEET: return {
      ...state,
      tweet_data: state.tweet_data.filter(item => item.tweet_id !== action.payload.tweet_id)
    }
    default: return state
  }
}

export default tweetReducer;