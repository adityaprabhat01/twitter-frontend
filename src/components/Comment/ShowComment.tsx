import { Box, Flex } from "@chakra-ui/react"

const ShowComment = (props) => {
  const { comment } = props
  console.log(props)
  return (
    <Box border={"2px"} width={"350px"}>
      <span>
        <b>{ comment.author_name }</b>&nbsp;
        <b>{ comment.author_username }</b>
      </span>
      <br />
      { comment.comment_text }
    </Box>
  )
}

export default ShowComment