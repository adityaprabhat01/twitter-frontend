import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const FollowersList = () => {
  let fetched = false;
  const x = useSelector((state: RootStateOrAny) => state)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    fetch(URL + 'followerList/' + x.auth.user_id)
    .then(res => res.json())
    .then(res => {
      fetched = true;
      setFollowers(res)
    })
  })
  
  return (
    <>
      Follower
      {
        followers.map((item: any) => {
          return (
            <UserDetails user={item} />
          )
        })
      }
    </>
  )
}

export default FollowersList;