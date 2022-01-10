import { Link } from "react-router-dom"
import { useSelector, RootStateOrAny } from "react-redux";
import { Button } from "@chakra-ui/react";

const ProfileButton = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  return (
    <>
      <Button>
        <Link to={`/profile/${x.auth.user_name}`}>
          Profile
        </Link>
      </Button>
    </>
  )
}

export default ProfileButton;