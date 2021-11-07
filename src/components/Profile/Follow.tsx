import React from "react";
import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";

const Follow = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  console.log(x.profile.user_id, x.auth.user_id)
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
    .then(res => console.log(res))
  }

  return (
    <div>
      <button onClick={handleFollow}>
        Follow
      </button>
    </div>
  )
}

export default Follow;