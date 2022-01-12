import { Box, Link } from "@chakra-ui/react"
import { useHistory } from "react-router";
import { URL } from "../../url";

const UserDetails = (props) => {
  const history = useHistory()
  
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + 'checkExistence/' + props.user.username, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.found === true) {
        history.push('/profile/' + props.user.username)
      }
    })
  }
  return (
    <>
      <Box border={"2px"} width={"350px"} padding={2}>
      <span onClick={handleSubmit}>
      <Link>
          <b>{ props.user.name }</b>&nbsp;&nbsp;&nbsp;
        </Link>
        <Link color={'#718096'}>@{ props.user.username }</Link>
      </span>
    </Box>
    </>
  )
}

export default UserDetails;