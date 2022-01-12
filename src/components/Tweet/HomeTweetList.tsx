import { Center, Divider, Stack } from "@chakra-ui/layout";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useFetch from "../../hooks/useFetch";
import useLikedTweets from "../../hooks/useLikedTweets";
import { homeFetchTweetsSuccess } from "../../store/home/homeAction";
import Loading from "../UI/Loading";
import Tweet from "./Tweet";

const HomeTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  useLikedTweets(x.auth.user_id);

  function handlePostFetch(fetchedData) {
    if (typeof fetchedData === "object" && fetchedData.redirect === true) {
      history.push("/signin");
    }
    let data: any = [];
    fetchedData.map((val) => {
      const {
        following_id,
        tweet_id,
        tweet,
        posted_on,
        likes_count,
        retweet_count,
        comment_count,
        name,
        email,
        username,
        author_id,
      } = val;
      const y = {
        following_id,
        tweet_id,
        tweet,
        posted_on,
        likes_count,
        comment_count,
        retweet_count,
        name,
        email,
        username,
        author_id,
        comments: [],
      };
      data.push(y);
    });
    dispatch(homeFetchTweetsSuccess(data));
  }

  const [homeData, isLoading, error, reFetch] = useFetch(
    {
      pathname: "homeTweets",
      method: "POST",
    },
    handlePostFetch,
    {
      user_id: x.auth.user_id,
    }
  );

  return (
    <>
      <Center>
        {isLoading === true ? (
          <Loading />
        ) : (
          <Stack border={"2px"} alignItems={"center"} maxWidth={"600px"}>
            {x.home.tweets.map((tweet) => {
              return (
                <>
                  <Tweet tweet={tweet} />
                  <Divider />
                </>
              );
            })}
          </Stack>
        )}
      </Center>
    </>
  );
};

export default HomeTweetList;
