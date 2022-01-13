import { useHistory } from "react-router";
import TwitterButton from "../UI/TwitterButton";

const LikedTweetsButton = (props) => {
  const history = useHistory()
  function handleClick() {
    history.push(`/LikedTweetsList/${props.user_id}`);
  }
  return (
    <>
      <TwitterButton method={handleClick} text={'Liked Tweets'} />
    </>
  )
}

export default LikedTweetsButton;