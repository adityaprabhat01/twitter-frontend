import React from "react";
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import tweetReducer from "./tweet/tweetReducer";
import profileReducer from "./profile/profileReducer";
import homeReducer from "./home/homeReducer";
import threadReducer from "./thread/threadReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tweet: tweetReducer,
  profile: profileReducer,
  home: homeReducer,
  thread: threadReducer
})

export default rootReducer;