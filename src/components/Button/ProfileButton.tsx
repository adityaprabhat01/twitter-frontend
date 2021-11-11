import { Link } from "react-router-dom"
import { useSelector, RootStateOrAny } from "react-redux";

const ProfileButton = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  return (
    <div>
      <Link to={`/profile/${x.auth.user_name}`}>
        Profile
      </Link>
    </div>
  )
}

export default ProfileButton;