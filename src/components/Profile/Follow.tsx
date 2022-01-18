import { URL } from "../../url";
import { useSelector, useDispatch } from "react-redux";
import { setFollowing } from "../../store/profile/profileAction";
import TwitterButton from "../UI/TwitterButton";
import { useState } from "react";
import Error from "../UI/Error";

const Follow = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id;
    const profile_user_id = state.profile.user_id;
    const user_name = state.auth.name;
    const profile_user_name = state.profile.user_name;
    const following = state.profile.following;
    return {
      user_id,
      user_name,
      profile_user_id,
      profile_user_name,
      following,
    };
  };
  const store = useSelector(handleSelector);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  function handleFollow() {
    fetch(URL + "/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        follower_id: store.user_id,
        following_id: store.profile_user_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          dispatch(setFollowing(true));
        }
      });
  }

  function handleUnfollow() {
    fetch(URL + "/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        follower_id: store.user_id,
        following_id: store.profile_user_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          dispatch(setFollowing(false));
        }
      });
  }
  return (
    <div>
      {error === "" ? (
        store.profile_user_name !== store.user_name &&
        store.profile_user_name !== "" ? (
          store.following === false ? (
            <TwitterButton method={handleFollow} text={"Follow"} />
          ) : (
            <TwitterButton method={handleUnfollow} text={"Unfollow"} />
          )
        ) : (
          ""
        )
      ) : (
        <Error message={error} />
      )}
    </div>
  );
};

export default Follow;
