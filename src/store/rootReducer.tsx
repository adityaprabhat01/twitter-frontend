import React from "react";
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import tweetReducer from "./tweet/tweetReducer";
import profileReducer from "./profile/profileReducer";
import homeReducer from "./home/homeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tweet: tweetReducer,
  profile: profileReducer,
  home: homeReducer
})

export default rootReducer;