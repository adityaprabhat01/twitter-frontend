import { FETCH_LIKED, FETCH_LIKED_SUCCESS, FETCH_LIKE_FAILURE, POST_COMMENT_LIKED_TWEET } from "./likedType"

const initeState = {
  tweet_data: [{
    following_id: '',
    tweet_id: '',
    tweet: '',
    posted_on: '',
    likes_count: '',
    retweet_count: '',
    name: '',
    email: '',
    username: '',
    author_id: '',
    comments: []
  }],
  loading: false,
  error: ''
}

const likedReducer = (state = initeState, action) => {
  switch(action.type) {
    case FETCH_LIKED: return {
      ...state,
      loading: true
    }
    case FETCH_LIKED_SUCCESS: return {
      ...state,
      loading: false,
      tweet_data: action.payload.map(tweet => 
        ({ ...tweet, comments: [] })
      )
    }
    case FETCH_LIKE_FAILURE: return {
      ...state,
      loading: false,
      error: ''
    }
    case POST_COMMENT_LIKED_TWEET: return {
      ...state,
      tweet_data: state.tweet_data.map((tweet, i) => tweet.tweet_id === action.payload.tweet_id ? {
        ...tweet, comments: [...tweet.comments, action.payload]
      } : tweet)
    }
    default: return state
  }
}

export default likedReducer