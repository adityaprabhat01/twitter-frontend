import React from "react";
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import tweetReducer from "./tweet/tweetReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tweet: tweetReducer
})

export default rootReducer;