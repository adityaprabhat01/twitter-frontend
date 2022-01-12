import { FETCH_LIKED, FETCH_LIKED_SUCCESS, FETCH_LIKE_FAILURE, POST_COMMENT_LIKED_TWEET } from "./likedType"

interface tweetDaataIteminterface {
  following_id: string,
  tweet_id: string,
  tweet: string,
  posted_on: string,
  likes_count: number,
  retweet_count: number,
  name: string,
  email: string,
  username: string,
  author_id: string,
  comments: Array<any>
}

interface initStateInterface {
  tweet_data: Array<tweetDaataIteminterface>,
  loading: boolean,
  error: string
}

const initeState: initStateInterface = {
  tweet_data: [],
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