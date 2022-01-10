import { Box, Button, Link } from "@chakra-ui/react"
import { useHistory } from "react-router";
import { URL } from "../../url";

const ShowComment = (props) => {
  const { comment } = props
  let data;
  if (typeof comment.data === "function") { 
    data = comment.data()
  } else {
    data = comment
  }
  const history = useHistory()
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + 'checkExistence/' + data.author_username, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.found === true) {
        history.push('/profile/' + data.author_username)
      }
    })
  }

  return (
    <Box border={'2px'} minWidth={'600px'} padding={2}>
      <span onClick={handleSubmit}>
        <Link>
          <b>{ data.author_name }</b>&nbsp;
        </Link>
        <br />
        <Link color={'#718096'}>@{ data.author_username }</Link>
      </span>
      <br />
      <Box>
        { data.comment_text }
      </Box>
      
      <Button>Reply</Button>
    </Box>
  )
}

export default ShowComment