import { FETCH_THREAD, FETCH_THREAD_FAILURE, FETCH_THREAD_SUCCESS } from "./threadType"

const initState = {
  tweet: {},
  comments: [],
  loading: false,
  error: ''
}

const threadReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_THREAD: return {
      ...state,
      loading: true
    }
    case FETCH_THREAD_SUCCESS: return {
      ...state,
      tweet: action.payload[0],
      comments: action.payload[1],
      loading: false
    }
    case FETCH_THREAD_FAILURE: return {
      ...state,
      error: 'error'
    }
    default: return state
  }
}

export default threadReducer