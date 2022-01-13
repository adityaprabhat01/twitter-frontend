import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { URL } from "../../url";
import User from "../UI/User";

const ShowComment = (props) => {
  const { comment } = props;
  let data;
  if (typeof comment.data === "function") {
    data = comment.data();
  } else {
    data = comment;
  }
  const history = useHistory();
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + "checkExistence/" + data.author_username, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.found === true) {
          history.push("/profile/" + data.author_username);
        }
      });
  }

  return (
    <Box minWidth={"600px"} padding={2}>
      <User
        user_id={undefined}
        author_id={data.author_id}
        name={data.author_name}
        user_name={data.author_username}
        tweet_id={comment.id || comment._id}
        handleSubmit={handleSubmit}
      />
      <br />
      <Box>{data.comment_text}</Box>

      <Button>Reply</Button>
    </Box>
  );
};

export default ShowComment;
