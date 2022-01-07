import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

const FollowingList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const [following, setFollowing] = useState([])
  let fetched = false;
  useEffect(() => {
    fetch(URL + 'followingList/' + x.auth.user_id, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      fetched = true;
      setFollowing(res)
    })
  }, [fetched])

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