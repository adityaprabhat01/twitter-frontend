import { Box, Stack } from "@chakra-ui/layout";
import User from "../UI/User";
import { useHistory } from "react-router";
import { URL } from "../../url";

const PostedComment = (props) => {
  const { comment } = props;
  const history = useHistory();

  console.log(comment);
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + "checkExistence/" + comment.author_username, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.found === true) {
          history.push("/profile/" + comment.author_username);
        }
      });
  }
  return (
    <>
      Posted Comment
      <Stack>
        <Box>
          <User
            user_id={undefined}
            author_id={comment.author_id}
            name={comment.author_name}
            user_name={comment.author_username}
            tweet_id={comment._id}
            handleSubmit={handleSubmit}
          />
          <Box as="p">{comment.comment_text}</Box>
        </Box>
      </Stack>
    </>
  );
};

export default PostedComment;
