import { Box, HStack, Link, VStack } from "@chakra-ui/layout";
import ProfilePicture from "../Profile/ProfilePicture";

const User = (props) => {
  const { handleSubmit, name, user_name, user_id, author_id, tweet_id, ago } = props
  return (
    <>
      <HStack onClick={handleSubmit}>
        <ProfilePicture user_id={user_id} author_id={author_id} tweet_id={tweet_id} />
        <VStack spacing={0}>
          <Link>
            <b>{ name }</b>&nbsp;
          </Link>
          <Link color={'#718096'}>@{ user_name }</Link>
        </VStack>
        <Box color={'#718096'}>{ago}</Box>
      </HStack>
    </>
  )
}

export default User;