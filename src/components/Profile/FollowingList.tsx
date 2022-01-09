import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import useAuthCookies from "../../hooks/useAuthCookies";

const FollowingList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const [following, setFollowing] = useState([])
  useAuthCookies()
  const controller = new AbortController()
  useEffect(() => {
    fetch(URL + 'followingList/' + x.profile.user_id, {
      credentials: 'include',
      signal: controller.signal
    })
    .then(res => res.json())
    .then(res => {
      setFollowing(res)
    })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      Following
      {
        following.map((item: any) => {
          return (
            <UserDetails user={item} />
          )
        })
      }
    </>
  )
}

export default FollowingList;