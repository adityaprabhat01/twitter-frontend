import { Button } from "@chakra-ui/react"
import { Link, useHistory } from "react-router-dom"
import TwitterButton from "../UI/TwitterButton";


const ThreadButton = (props) => {
  const { tweet } = props;
  
  function checkId() {
    if(tweet.user_id === undefined) {
      return tweet.author_id
    } else {
      return tweet.user_id
    }
  }

  const history = useHistory();
  function handleClick() {
    history.push(`/thread/${user_id}/${props.tweet.tweet_id}`);
  }

  const user_id = checkId()

  return (
    <>
      <TwitterButton method={handleClick} text={"Thread"} />
    </>
  )
}

export default ThreadButton