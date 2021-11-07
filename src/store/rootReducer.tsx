import React from "react";
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import tweetReducer from "./tweet/tweetReducer";
import profileReducer from "./profile/profileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tweet: tweetReducer,
  profile: profileReducer
})

export default rootReducer;