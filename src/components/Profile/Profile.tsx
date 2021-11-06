import React from 'react'
import TweetArea from '../Tweet/ TweetArea';
import TweetList from '../Tweet/TweetList';
import { useSelector, RootStateOrAny } from 'react-redux';

const Profile = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  console.log(x)
  return (
    <div>
      Profile
      { x.auth.name }
      { x.auth.user_name }
      <TweetArea />
      <TweetList />
    </div>
  )
}

export default Profile;