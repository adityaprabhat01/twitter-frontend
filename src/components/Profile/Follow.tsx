import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { setFollowing } from "../../store/profile/profileAction";

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
      })
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
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(setFollowing(false))
    })
  }
  console.log("Follow")
  return (
    <div>
      {
        x.profile.following === false ?
        <button onClick={handleFollow}>Follow</button> :
        <button onClick={handleUnfollow}>Unfollow</button>
      }
      {/* {
        x.auth.user_name !== x.profile.user_name && x.profile.following === false ?
          (
            <button onClick={handleFollow}>
              Follow
            </button>
          ) : (
            x.auth.user_name === x.profile.user_name ?
            null :
            <button onClick={handleUnfollow}>
            Unfollow
          </button> 
          )
      } */}
      
    </div>
  )
}

export default Follow;