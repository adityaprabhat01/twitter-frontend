import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTweetsSuccess } from "../../store/tweet/tweetAction";
import Tweet from "./Tweet";
import { Center, Divider, Stack } from "@chakra-ui/layout";
import useLikedTweets from "../../hooks/useLikedTweets";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";
import axios from "axios";
import { URL } from "../../url";

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});
const source = axios.CancelToken.source();

const TweetList = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    const user_name = state.auth.user_name
    const tweets = state.tweet.tweet_data
    return { user_id, user_name, tweets }
  }

  const store = useSelector(handleSelector)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useLikedTweets(store.user_id);
  const user_name = useCheckParams("USER_NAME");

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      Promise.all([
        api.post("ownTweets", {
          user_id: store.user_name === user_name ? store.user_id : "",
          user_name,
        }),

        api.post("ownRetweetedTweets", {
          user_id: store.user_name === user_name ? store.user_id : "",
          user_name,
        }),
      ])
        .then((responses) => {
          let res = responses[0].data;
          for (let i = 0; i < responses[1].data.length; i++) {
            res.push(responses[1].data[i]);
          }
          dispatch(fetchTweetsSuccess(res));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      unmounted = true;
      source.cancel();
      setLoading(true);
    };
  }, [dispatch, user_name, store.user_id, store.user_name]);

  return (
    <>
      <Center>
        {loading === true ? (
          <Loading />
        ) : (
          <Stack border={"2px"} borderColor={"#1d9af9"} borderRadius={'10px'} alignItems={"center"} maxWidth={"600px"}>
            {store.tweets.map((tweet) => {
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

export default TweetList;
