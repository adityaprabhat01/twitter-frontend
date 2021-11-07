import { FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE } from "./profileType";

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
