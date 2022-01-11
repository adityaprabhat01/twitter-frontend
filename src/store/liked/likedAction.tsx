import { FETCH_USER_FAILURE } from "../auth/authType"
import { FETCH_LIKED, FETCH_LIKED_SUCCESS, POST_COMMENT_LIKED_TWEET } from "./likedType"

export const fetchLiked = () => {
  return {
    type: FETCH_LIKED
  }
}

export const fetchLikedSuccess = (data) => {
  return {
    type: FETCH_LIKED_SUCCESS,
    payload: data
  }
}

export const fetchLikedFailure = () => {
  return {
    type: FETCH_USER_FAILURE
  }
}

export const postCommentLikedTweet = (data) => {
  return {
    type: POST_COMMENT_LIKED_TWEET,
    payload: data
  }
}