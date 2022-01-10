import { Button } from "@chakra-ui/react"
import { useHistory } from "react-router"

const Followers = (props) => {
  const history = useHistory()
  function handleFollowers() {
      history.push(`/followersList/${props.user_id}`)
  }
  return (
    <>
      <Button onClick={handleFollowers}>
        Followers
      </Button>
    </>
  )
}

export default Followers