import { Button } from "@chakra-ui/react"
import { useHistory } from "react-router"

const Followers = () => {
  const history = useHistory()
  function handleFollowers() {
      history.push('/followersList')
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