import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { setFollowing } from "../../store/profile/profileAction";
import { Button } from "@chakra-ui/react";

const Follow = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const dispatch = useDispatch()
  
  function handleFollow() {
    fetch(URL + '/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        follower_id: x.auth.user_id,
        following_id: x.profile.user_id
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
        follower_id: x.auth.user_id,
        following_id: x.profile.user_id
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
        (x.profile.user_name !== x.auth.user_name) && x.profile.user_name !== '' ?
        (x.profile.following === false ?
        <Button onClick={handleFollow}>Follow</Button> :
        <Button onClick={handleUnfollow}>Unfollow</Button>) :
        ''
      }
    </div>
  )
}

export default Follow;