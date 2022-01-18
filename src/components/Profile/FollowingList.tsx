import UserDetails from "./UserDetails";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Center, VStack } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const FollowingList = () => {
  useAuthCookies()

  let [following, isLoading, error, reFetch] = useFetch(
    {
      pathname: "followingList" + "/" + useCheckParams('USER_ID'),
      method: "GET",
    },
    null,
    null,
  );

  console.log(error)

  return (
    <>
      <Center>
        <VStack>
          <div>Following</div>
          { 
            isLoading === true ? 
              <Loading /> :
              error === '' ?
            following.map((item: any) => {
              return (
                <UserDetails user={item} />
              )
            }) : <Error message={error} />
          }
        </VStack>
      </Center>
    </>
  )
}

export default FollowingList;