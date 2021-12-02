import { Box } from "@chakra-ui/layout";

const UserDetails = (props) => {
  return (
    <>
      <Box border={"2px"} width={"350px"}>
      <span>
        <b>{ props.user.name }</b>&nbsp;
        <b>{ props.user.username }</b>
      </span>
    </Box>
    </>
  )
}

export default UserDetails;