import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TwitterButton from "../UI/TwitterButton";

const ProfileButton = () => {
  const handleSelector = (state) => {
    const user_name = state.auth.user_name;
    return { user_name };
  };
  const history = useHistory();
  function handleClick() {
    history.push(`/profile/${store.user_name}`);
  }
  const store = useSelector(handleSelector);
  return (
    <>
      <TwitterButton method={handleClick} text={"Profile"} />
    </>
  );
};

export default ProfileButton;
