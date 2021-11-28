import { HOME_FETCH_TWEETS, HOME_FETCH_TWEETS_SUCCESS, HOME_FETCH_TWEETS_FAILURE, HOME_ADD_LIKED_TWEETS, HOME_REMOVE_LIKED_TWEETS, HOME_LIKED_TWEETES, HOME_RETWEETED_TWEETES, HOME_ADD_RETWEETED_TWEETS, HOME_REMOVE_RETWEETED_TWEETS, HOME_POST_COMMENT } from "./homeType";

const initState = {
  tweets: [{
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
  error: '',
  liked: {},
  retweeted: {}
}

const homeReducer = (state = initState, action) => {
  switch(action.type) {
    case HOME_FETCH_TWEETS: return {
      ...state,
      loading: true
    }
    case HOME_FETCH_TWEETS_SUCCESS: return {
      ...state,
      loading: false,
      tweets: action.payload
    }
    case HOME_FETCH_TWEETS_FAILURE: return {
      ...state,
      loading: false,
      error: 'error'
    }
    case HOME_LIKED_TWEETES: return {
      ...state,
      liked: action.payload
    }
    case HOME_ADD_LIKED_TWEETS: return {
      ...state,
      liked: { ...state.liked, [action.payload.tweet_id]: action.payload }
    }
    case HOME_REMOVE_LIKED_TWEETS:
      let newState = { ...state };
      delete newState.liked[action.payload]
      return newState;
    case HOME_RETWEETED_TWEETES: return {
      ...state,
      retweeted: action.payload
    }
    case HOME_ADD_RETWEETED_TWEETS: return {
      ...state,
      retweeted: { ...state.retweeted, [action.payload.tweet_id]: action.payload }
    }
    case HOME_REMOVE_RETWEETED_TWEETS:
      let newState_1 = { ...state };
      delete newState_1.retweeted[action.payload]
      return newState_1;
    case HOME_POST_COMMENT: return {
      ...state,
      tweets: state.tweets.map((tweet, i) => tweet.tweet_id === action.payload.tweet_id ? {
        ...tweet, comments: [...tweet.comments, action.payload]
      } : tweet)
    }

    default: return state;
  }
}

export default homeReducer;