import React from "react"
import { SIGN_IN, FETCH_USER, FETCH_USER_FAILURE } from "./authType"

const initState = {
  user_id: '',
  user_name: '',
  loading: false,
  error: '',
  name: ''
}

const authReducer = (state = initState, action: { type: string; payload: { name: string; user_id: string; user_name: string, loading: boolean, error: string } }) => {
  switch(action.type) {
    case SIGN_IN: return {
      ...state,
      user_id: action.payload.user_id,
      user_name: action.payload.user_name,
      loading: false,
      name: action.payload.name
    }
    case FETCH_USER: return {
      ...state,
      loading: true
    }
    case FETCH_USER_FAILURE: return {
      ...state,
      error: action.payload.error
    }
    default: return state
  }
}

export default authReducer;