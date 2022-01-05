import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router";

const LikedTweetsButton = () => {
  const history = useHistory()
  function handleClick() {
    history.push('/LikedTweetsList');
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