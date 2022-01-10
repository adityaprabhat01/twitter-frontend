import { URL } from "../../url";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import useAuthCookies from "../../hooks/useAuthCookies";
import { useParams } from "react-router";
import { Center, Spinner, VStack } from "@chakra-ui/react";

const FollowingList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  useAuthCookies()
  const controller = new AbortController()
  useEffect(() => {
    type Params = { user_id: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).user_id !== undefined;
    }
    if(isParams(params)) {
      fetch(URL + 'followingList/' + params.user_id, {
        credentials: 'include',
        signal: controller.signal
      })
      .then(res => res.json())
      .then(res => {
        setFollowing(res)
        setLoading(false)
      })
    }

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <Center>
        <VStack>
          <div>Following</div>
          { 
            loading === true ? <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            /> :
            
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