import { Box, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { URL } from "../../url";
import Error from "../UI/Error";

const UserDetails = (props) => {
  const history = useHistory();
  const [error, setError] = useState("");
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + "checkExistence/" + props.user.username, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          if (res.found === true) {
            history.push("/profile/" + props.user.username);
          }
        }
      });
  }
  return (
    <>
      {error === "" ? (
        <Box border={"2px"} width={"350px"} padding={2}>
          <span onClick={handleSubmit}>
            <Link>
              <b>{props.user.name}</b>&nbsp;&nbsp;&nbsp;
            </Link>
            <Link color={"#718096"}>@{props.user.username}</Link>
          </span>
        </Box>
      ) : (
        <Error message={error} />
      )}
    </>
  );
};

export default UserDetails;
