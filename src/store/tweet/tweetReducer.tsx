import { POST_TWEET, POST_TWEET_FAILURE, POST_TWEET_SUCCESS, FETCH_TWEETS, FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILURE, UPDATE_DELETED_TWEET, POST_COMMENT } from "./tweetTypes";

interface tweet_data_interface {
  tweet: string,
  tweet_id: string,
  comments: Array<any>
}

interface retweet_data_interface {
  tweet: string,
  tweet_id: string,
  comments: Array<any>
}

interface initStateInterface {
  tweet_data: Array<tweet_data_interface>,
  retweet_data: Array<retweet_data_interface>,
  loading: boolean,
  error: string
}

const initState: initStateInterface = {
  tweet_data: [],
  retweet_data: [],
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
      tweet_data: action.payload.map(tweet => 
        ({ ...tweet, comments: [] })
      )
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
    case POST_COMMENT: return {
      ...state,
      tweet_data: state.tweet_data.map((tweet, i) => tweet.tweet_id === action.payload.tweet_id ? {
        ...tweet, comments: [...tweet.comments, action.payload]
      } : tweet),
      retweet_data: state.retweet_data.map((tweet, i) => tweet.tweet_id === action.payload.tweet_id ? {
        ...tweet, comments: [...tweet.comments, action.payload]
      } : tweet)
    }
    default: return state
  }
}

export default tweetReducer;