import { Button } from "@chakra-ui/react"
import { useHistory } from "react-router"

const Following = (props) => {
  const history = useHistory()
  function handleFollowers() {
      history.push(`/followingList/${props.user_id}`)
  }
  return (
    <>
      <Button onClick={handleFollowers}>
        Following
      </Button>
    </>
  )
}

export default Following;