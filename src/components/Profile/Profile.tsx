import React, { useState, useEffect } from 'react'
import TweetArea from '../Tweet/ TweetArea';
import TweetList from '../Tweet/TweetList';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import Follow from './Follow';
import { URL } from '../../url';
import { fetchProfile, fetchProfileFailure, fetchProfileSuccess, setFollowing } from '../../store/profile/profileAction';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Profile = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const params = useParams()
  const dispatch = useDispatch()
  const [ownProfile, setOwnProfile] = useState(true);
  let ownProfileStatus = false;
  const history = useHistory()

  useEffect(() => {
    type Params = { user_name: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).user_name !== undefined;
    }
    if(isParams(params))  {
      if(x.auth.user_name === params.user_name) {
        setOwnProfile(false)
      }
      dispatch(fetchProfile())
      fetch(URL + 'search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: params.user_name
        })
      })
      .then(res => res.json())
      .then(res => {
        const { user_id, username, name } = res;
        const data = {
          user_id,
          user_name: username,
          name
        }
        dispatch(fetchProfileSuccess(data))
        

        fetch(URL + 'checkFollow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            follower_id: x.auth.user_id,
            following_id: user_id
          })
        })
        .then(res => res.json())
        .then(res => {
          if(res.length !== 0) {
            dispatch(setFollowing(true))
          } else {
            dispatch(setFollowing(false))
          }
        })
      })
      .catch(err => dispatch(fetchProfileFailure()))
      
    }
  }, [history.location.pathname])


  return (
    <div>
      Profile
      <SearchBar />
      {
        ownProfile === false ? <><Follow /></>  : <></>
      }

      { x.profile.name }
      { x.profile.user_name }

      <TweetArea />
      <TweetList />
    </div>
  )
}

export default Profile;