import UserDetails from "./UserDetails";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Center, VStack } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";

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

  return (
    <>
      <Center>
        <VStack>
          <div>Following</div>
          { 
            isLoading === true ? 
              <Loading /> :
            following.map((item: any) => {
              return (
                <UserDetails user={item} />
              )
            })
          }
        </VStack>
      </Center>
    </>
  )
}

export default FollowingList;