import LogOut from "../Auth/LogOut";
import ProfileButton from "../Button/ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import HomeTweetList from "../Tweet/HomeTweetList";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Grid, VStack } from "@chakra-ui/layout";

const Homepage = () => {
  useAuthCookies()
  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={4} mb={4}>
        <VStack>
          <ProfileButton />
          <LogOut />
        </VStack>
        <VStack>
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