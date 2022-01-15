import LogOut from "../Auth/LogOut";
import ProfileButton from "../Button/ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import HomeTweetList from "../Tweet/HomeTweetList";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Grid, Heading, VStack } from "@chakra-ui/layout";
import ProfileImage from "../UI/ProfileImage";
import { useSelector } from "react-redux";

const Homepage = () => {
  useAuthCookies()
  const handleSelector = (state) => {
    const user_id = state.auth.user_id;
    return {
      user_id,
    };
  };
  const store = useSelector(handleSelector);
  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={4} mb={4}>
        <VStack>
          <ProfileImage user_id={store.user_id} />
          <ProfileButton />
          <LogOut />
        </VStack>
        <VStack>
          <Heading>Home</Heading>
          <HomeTweetList /> 
        </VStack>  
        <VStack>
          <SearchBar />
        </VStack>  
      </Grid>
    </>
  )
};    

export default Homepage;