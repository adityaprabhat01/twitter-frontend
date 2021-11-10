import { HOME_FETCH_TWEETS, HOME_FETCH_TWEETS_SUCCESS, HOME_FETCH_TWEETS_FAILURE, HOME_LIKED_TWEETES, HOME_ADD_LIKED_TWEETS, HOME_REMOVE_LIKED_TWEETS } from "./homeType";

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
    username: ''
  }],
  loading: false,
  error: '',
  liked: {}
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
      delete newState.liked[action.payload];
      return newState;
    default: return state;
  }
}

export default homeReducer;