import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router";

const LikedTweetsButton = (props) => {
  const history = useHistory()
  function handleClick() {
    history.push(`/LikedTweetsList/${props.user_id}`);
  }
  return (
    <>
      <Button onClick={handleClick}>
        Liked Tweets
      </Button>
    </>
  )
}

export default LikedTweetsButton;