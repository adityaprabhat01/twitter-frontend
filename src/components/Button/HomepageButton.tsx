import { Button } from "@chakra-ui/react"
import { useHistory } from "react-router"

const HomepageButton = (props) => {
  const history = useHistory()
  function handleHomepage() {
      history.push('/homepage')
  }
  return (
    <>
      <Button onClick={handleHomepage}>
        Homepage
      </Button>
    </>
  )
}

export default HomepageButton;