import { Button } from "@chakra-ui/react"
import { useHistory } from "react-router";
import { URL } from "../../url";

const LogOut = () => {
  const history = useHistory()
  
  function handleLogOut(event) {
    fetch(URL + 'logout', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      history.push('/signin');
    })
  }
  return (
    <>
      <Button onClick={handleLogOut}>
        Logout
      </Button>
    </>
  )
}

export default LogOut;