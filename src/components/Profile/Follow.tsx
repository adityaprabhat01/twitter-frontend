import { URL } from "../../url";
import { useSelector, useDispatch } from "react-redux";
import { setFollowing } from "../../store/profile/profileAction";
import { Button } from "@chakra-ui/react";

const Follow = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    const profile_user_id = state.profile.user_id
    const user_name = state.auth.name
    const profile_user_name = state.profile.user_name
    const following = state.profile.following
    return { user_id, user_name, profile_user_id, profile_user_name, following }
  }
  const store = useSelector(handleSelector)
  const dispatch = useDispatch()
  
  function handleFollow() {
    fetch(URL + '/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        follower_id: store.user_id,
        following_id: store.profile_user_id
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      dispatch(setFollowing(true))
    })
  }

  function handleUnfollow() {
    fetch(URL + '/unfollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        follower_id: store.user_id,
        following_id: store.profile_user_id
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      dispatch(setFollowing(false))
    })
  }
  return (
    <div>
      {
        (store.profile_user_name !== store.user_name) && store.profile_user_name !== '' ?
        (store.following === false ?
        <Button onClick={handleFollow}>Follow</Button> :
        <Button onClick={handleUnfollow}>Unfollow</Button>) :
        ''
      }
    </div>
  )
}

export default Follow;