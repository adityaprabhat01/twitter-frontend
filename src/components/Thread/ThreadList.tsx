import { useEffect, useState } from "react";
import { URL } from "../../url";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  fetchThread,
  fetchThreadFailure,
  fetchThreadSuccess,
} from "../../store/thread/threadAction";
import Tweet from "../Tweet/Tweet";
import ShowComment from "../Comment/ShowComment";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Box, Center, VStack } from "@chakra-ui/react";
import useLikedTweets from "../../hooks/useLikedTweets";
import useAuthCookies from "../../hooks/useAuthCookies";
import useCheckParams from "../../hooks/useCheckParams";
import Loading from "../UI/Loading";

const ThreadList = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    const tweets = state.thread.tweet
    const comments = state.thread.comments
    return { user_id, tweets, comments }
  }
  const store = useSelector(handleSelector)
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const controller = new AbortController();

  useAuthCookies();
  useLikedTweets(store.user_id);
  const tweet_id = useCheckParams("USER_NAME_TWEET_ID");

  useEffect(() => {
    dispatch(fetchThread());
    fetch(URL + "fetchThread/" + tweet_id, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(async (res) => {
        const db = getFirestore();
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("tweet_id", "==", tweet_id));
        const querySnapshot = await getDocs(q);
        res.push(querySnapshot.docs);
        dispatch(fetchThreadSuccess(res));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(fetchThreadFailure());
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Center>
        <VStack>
          <div>ThreadList</div>
          {loading === true ? (
           <Loading />
          ) : (
            <>
              <Box border={"2px"} alignItems={"center"} maxWidth={"600px"}>
                <Tweet tweet={store.tweets} />
              </Box>
              <VStack>
                {store.comments.map((comment) => {
                  return <ShowComment comment={comment} />;
                })}
              </VStack>
            </>
          )}
        </VStack>
      </Center>
    </>
  );
};

export default ThreadList;
