import { FETCH_THREAD, FETCH_THREAD_FAILURE, FETCH_THREAD_SUCCESS } from "./threadType"

export const fetchThread = () => {
  return {
    type: FETCH_THREAD
  }
}

export const fetchThreadSuccess = (data) => {
  return {
    type: FETCH_THREAD_SUCCESS,
    payload: data
  }
}

export const fetchThreadFailure = () => {
  return {
    type: FETCH_THREAD_FAILURE
  }
}