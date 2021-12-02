import { Button } from "@chakra-ui/react"
import { useHistory } from "react-router"

const Following = () => {
  const history = useHistory()
  function handleFollowers() {
      history.push('/followingList')
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