import { Box, Button } from "@chakra-ui/react"

const ShowComment = (props) => {
  const { comment } = props
  let data;
  if (typeof comment.data === "function") { 
    data = comment.data()
  } else {
    data = comment
  }
  return (
    <Box border={"2px"} width={"350px"}>
      <span>
        <b>{ data.author_name }</b>&nbsp;
        <b>{ data.author_username }</b>
      </span>
      <br />
      { data.comment_text }
      <Button>Reply</Button>
    </Box>
  )
}

export default ShowComment