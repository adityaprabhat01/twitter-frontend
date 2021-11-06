import React, { useState } from 'react';
import { SIGN_IN, FETCH_USER, FETCH_USER_FAILURE } from './authType';

export const signInAction = (data) => {
  return {
    type: SIGN_IN,
    payload: data
  }
}

export const fetchUser = () => {
  return {
    type: FETCH_USER
  }
}

export const fetchUserFailure = () => {
  return {
    type: FETCH_USER_FAILURE
  }
}