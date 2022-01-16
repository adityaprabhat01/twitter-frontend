import { FETCH_THREAD, FETCH_THREAD_FAILURE, FETCH_THREAD_SUCCESS, POST_COMMENT_THREAD, UPDATE_COMMENT_THREAD } from "./threadType"

export const fetchThread = () => {
  return {
    type: FETCH_THREAD
  }
}

export const fetchThreadSuccess = (data) => {
  console.log(data)
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

export const postCommentThread = (data) => {
  return {
    type: POST_COMMENT_THREAD,
    payload: data
  }
}

export const updateCommentThread = (data) => {
  return {
    type: UPDATE_COMMENT_THREAD,
    payload: data
  }
}