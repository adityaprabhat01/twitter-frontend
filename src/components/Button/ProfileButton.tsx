import { Link } from "react-router-dom"
import { useSelector, RootStateOrAny } from "react-redux";
import { Button } from "@chakra-ui/react";

const ProfileButton = () => {
  const handleSelector = (state) => {
    const user_name = state.auth.user_name
    return { user_name }
  }
  const store = useSelector(handleSelector)
  return (
    <>
      <Button>
        <Link to={`/profile/${store.user_name}`}>
          Profile
        </Link>
      </Button>
    </>
  )
}

export default ProfileButton;