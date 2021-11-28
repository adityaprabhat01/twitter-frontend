import { Box, Stack } from "@chakra-ui/layout"

const PostedComment = (props) => {
  const { comment } = props
  return (
    <>
      Posted Comment
      <Stack>
        <Box>
          <span>
            <b>{ comment.author_name }</b>&nbsp;
            <b>{ comment.author_username }</b>
          </span>
          <Box as="p">
            { comment.comment_text }
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default PostedComment