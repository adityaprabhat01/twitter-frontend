import UserDetails from "./UserDetails";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Center, VStack } from "@chakra-ui/react";
import useFetch from "../../hooks/useFetch";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const FollowersList = () => {
  useAuthCookies();

  let [followers, isLoading, error, reFetch] = useFetch(
    {
      pathname: "/followerList" + "/" + useCheckParams('USER_ID'),
      method: "GET",
    },
    null,
    null,
  );
  
  return (
    <>
      <Center>
        <VStack>
          <div>Follower</div>
          {isLoading === true ? (
            <Loading />
          ) : (
            error === '' ?
            followers.map((item: any) => {
              return <UserDetails user={item} />;
            }) : <Error message={error} />
          )}
        </VStack>
      </Center>
    </>
  );
};

export default FollowersList;
