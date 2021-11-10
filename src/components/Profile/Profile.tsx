import React, { useState, useEffect } from 'react'
import TweetArea from '../Tweet/ TweetArea';
import TweetList from '../Tweet/TweetList';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import Follow from './Follow';
import { URL } from '../../url';
import { fetchProfile, fetchProfileFailure, fetchProfileSuccess } from '../../store/profile/profileAction';
import { Link } from 'react-router-dom';

const Profile = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const params = useParams()
  const dispatch = useDispatch()
  const [ownProfile, setOwnProfile] = useState(true);
  let ownProfileStatus = false;
  const history = useHistory()
  let name = ''
  let user_name = ''

  useEffect(() => {
    type Params = { user_name: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).user_name !== undefined;
    }
    if(isParams(params))  {
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
        console.log(res);
        const { user_id, username, name } = res;
        const data = {
          user_id,
          user_name: username,
          name
        }
        dispatch(fetchProfileSuccess(data))
        setOwnProfile(false)
      })
      .catch(err => dispatch(fetchProfileFailure()))
      
    }
  }, [history.location.pathname])
  
  function handleRahul() {
    
    history.push("/profile/adityasingh")
  }

  return (
    <div>
      Profile
      {
        ownProfile === false ? <Follow /> : null
      }

      { x.profile.name }
      { x.profile.user_name }
      <TweetArea />
      <TweetList />
      <button onClick={handleRahul}>Rahul</button>
    </div>
  )
}

export default Profile;