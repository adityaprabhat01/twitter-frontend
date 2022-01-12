import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { fetchTweetsSuccess } from "../../store/tweet/tweetAction";
import { URL } from "../../url";
import Tweet from "./Tweet";
import { useHistory } from "react-router";
import { Center, Divider, Stack } from "@chakra-ui/layout";
import useLikedTweets from "../../hooks/useLikedTweets";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";

const TweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const controller = new AbortController();

  useLikedTweets(x.auth.user_id);
  const user_name = useCheckParams("USER_NAME");

  useEffect(() => {
    Promise.all([
      fetch(URL + "ownTweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: x.auth.user_name === user_name ? x.auth.user_id : "",
          user_name,
        }),
        credentials: "include",
        signal: controller.signal,
      }),

      fetch(URL + "ownRetweetedTweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: x.auth.user_name === user_name ? x.auth.user_id : "",
          user_name,
        }),
        credentials: "include",
        signal: controller.signal,
      }),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        for (let i = 0; i < res[1].length; i++) {
          res[0].push(res[1][i]);
        }
        dispatch(fetchTweetsSuccess(res[0]));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      controller.abort();
      setLoading(true);
    };
  }, [history.location.pathname]);

  return (
    <>
      <Center>
        {loading === true ? (
          <Loading />
        ) : (
          <Stack border={"2px"} alignItems={"center"} maxWidth={"600px"}>
            {x.tweet.tweet_data.map((tweet) => {
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
