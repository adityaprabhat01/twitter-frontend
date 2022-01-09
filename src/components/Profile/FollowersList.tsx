import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import useAuthCookies from "../../hooks/useAuthCookies";

const FollowersList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const [followers, setFollowers] = useState([])
  useAuthCookies()
  const controller = new AbortController()
  useEffect(() => {
    fetch(URL + 'followerList/' + x.profile.user_id, {
      credentials: 'include',
      signal: controller.signal
    })
    .then(res => res.json())
    .then(res => {
      setFollowers(res)
    })

    return () => {
      controller.abort()
    }
  }, [])
  
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