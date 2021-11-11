import { FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, SET_FOLLOWING } from "./profileType";

export const fetchProfile = () => {
  return {
    type: FETCH_PROFILE
  }
}

export const fetchProfileSuccess = (data) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: data
  }
}

export const fetchProfileFailure = () => {
  return {
    type: FETCH_PROFILE_FAILURE
  }
}

export const setFollowing = (data) => {
  return {
    type: SET_FOLLOWING,
    payload: data
  }
}