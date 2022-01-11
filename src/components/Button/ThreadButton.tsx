import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const ThreadButton = (props) => {
  const { tweet } = props;
  
  function checkId() {
    if(tweet.user_id === undefined) {
      return tweet.author_id
    } else {
      return tweet.user_id
    }
  }

  const user_id = checkId()

  return (
    <>
      <Link to={`/thread/${user_id}/${props.tweet.tweet_id}`}>
        <Button>Thread</Button>
      </Link>
    </>
  )
}

export default ThreadButton