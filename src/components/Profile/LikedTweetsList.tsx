import { useSelector, useDispatch } from "react-redux";
import Tweet from "../Tweet/Tweet";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Center, Divider, Stack } from "@chakra-ui/layout";
import useLikedTweets from "../../hooks/useLikedTweets";
import { fetchLikedSuccess } from "../../store/liked/likedAction";
import useFetch from "../../hooks/useFetch";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";

const LikedTweetList = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    const tweets = state.liked.tweet_data
    return { user_id, tweets }
  }
  const store = useSelector(handleSelector)
  const dispatch = useDispatch()
  
  useAuthCookies()
  useLikedTweets(store.user_id)

  function handlePostFetch(fetchedData) {
    dispatch(fetchLikedSuccess(fetchedData))
  }

  let [likedTweets, isLoading, error, reFetch] = useFetch(
    {
      pathname: "/likedTweetsWithDetails" + "/" + useCheckParams('USER_ID'),
      method: "GET",
    },
    handlePostFetch,
    null,
  );

  
  
  return (
    <>
      <Center>
        {
          isLoading === true ? 
          <Loading /> : 
          <Stack border={"2px"} alignItems={"center"} maxWidth={'600px'} mt={2} mb={2}>
            Liked Tweets
            {
              store.tweets.map((tweet: any) => {
                return (
                  <>
                    <Tweet tweet={tweet} />
                    <Divider />
                  </>
                )
              })
            }
          </Stack>
        }
      </Center>
    </>
  )
}

export default LikedTweetList;