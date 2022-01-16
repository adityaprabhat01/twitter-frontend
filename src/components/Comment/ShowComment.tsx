import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { URL } from "../../url";
import User from "../UI/User";
import ShowReply from "./ShowReply";

const ShowComment = (props) => {
  const { comment, tweet_id } = props;

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
      <ShowReply replies={data} tweet_id={tweet_id} comment_id={data.comment_id} id_firestore={comment.id} />
    </Box>
  );
};

export default ShowComment;
