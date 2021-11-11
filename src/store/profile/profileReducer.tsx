import { FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, SET_FOLLOWING } from "./profileType"

const initState = {
  user_id: '',
  user_name: '',
  loading: '',
  error: '',
  name: '',
  following: false
}

const profileReducer = (state = initState, action: { type: string; payload: { user_id: string; user_name: string; name: string; error: string, loading: boolean } }) => {
  switch(action.type) {
    case FETCH_PROFILE: return {
      ...state,
      loading: true
    }
    case FETCH_PROFILE_SUCCESS: return {
      ...state,
      user_id: action.payload.user_id,
      user_name: action.payload.user_name,
      loading: false,
      name: action.payload.name
    }
    case FETCH_PROFILE_FAILURE: return {
      ...state,
      loading: false,
      error: action.payload.error
    }
    case SET_FOLLOWING: return {
      ...state,
      following: action.payload
    }
    default: return state;
  }
}

export default profileReducer