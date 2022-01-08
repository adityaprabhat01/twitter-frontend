import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const ThreadButton = (props) => {
  return (
    <>
      <Link to={`/thread/${props.tweet.tweet_id}`}>
        <Button mt={4}>Thread</Button>
      </Link>
    </>
  )
}

export default ThreadButton