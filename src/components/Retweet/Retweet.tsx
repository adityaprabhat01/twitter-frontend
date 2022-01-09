import { URL } from "../../url";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import {
  homeAddRetweetedTweets,
  homeRemoveRetweetedTweets,
} from "../../store/home/homeAction";
import { Box } from "@chakra-ui/react";

const Retweet = (props) => {
  const x = useSelector((state: RootStateOrAny) => state);
  const { tweet } = props;
  const { tweet_id, author_id } = tweet;
  const retweetedStatus = x.home.retweeted;
  const dispatch = useDispatch();

  function handleRetweet() {
    fetch(URL + "retweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id: author_id,
        tweet_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const { tweet_id, status } = res;
        const obj = {
          tweet_id,
          liked: status,
        };
        dispatch(homeAddRetweetedTweets(obj));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUnretweet() {
    fetch(URL + "unretweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id: author_id,
        tweet_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const { tweet_id } = res;
        dispatch(homeRemoveRetweetedTweets(tweet_id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {retweetedStatus[tweet.tweet_id] === undefined ? (
        <Box mt={"4"} onClick={handleRetweet}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 172 172"
            style={{ fill: "#000000" }}
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill="#3498db">
                <path d="M64.514,35.83333c-6.01283,0 -9.35429,6.95167 -5.59896,11.64583c1.36167,1.6985 3.42029,2.6875 5.59896,2.6875h64.486c3.956,0 7.16667,3.21067 7.16667,7.16667v43h-11.22591c-4.14233,0 -6.43645,4.78834 -3.84929,8.02051l17.2308,21.55599c2.56567,3.21067 7.45647,3.21067 10.02214,0l17.2308,-21.55599c2.58717,-3.23217 0.29305,-8.02051 -3.84929,-8.02051h-11.22591v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM28.66667,39.68262c-1.86333,0 -3.72823,0.80222 -5.01107,2.40755l-17.23079,21.55599c-2.58717,3.23217 -0.29305,8.02051 3.84928,8.02051h11.22591v43c0,11.87517 9.62483,21.5 21.5,21.5h64.486c6.01283,0 9.35429,-6.95167 5.59896,-11.64583c-1.36167,-1.6985 -3.42029,-2.6875 -5.59896,-2.6875h-64.486c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667v-43h11.22591c4.14233,0 6.43645,-4.78834 3.84928,-8.02051l-17.23079,-21.55599c-1.28283,-1.60533 -3.14773,-2.40755 -5.01107,-2.40755z"></path>
              </g>
            </g>
          </svg>
        </Box>
      ) : (
        <Box mt={"4"} onClick={handleUnretweet}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 172 172"
            style={{ fill: "#000000" }}
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill="#2ecc71">
                <path d="M64.514,35.83333c-6.01283,0 -9.35429,6.95167 -5.59896,11.64583c1.36167,1.6985 3.42029,2.6875 5.59896,2.6875h64.486c3.956,0 7.16667,3.21067 7.16667,7.16667v43h-11.22591c-4.14233,0 -6.43645,4.78834 -3.84929,8.02051l17.2308,21.55599c2.56567,3.21067 7.45647,3.21067 10.02214,0l17.2308,-21.55599c2.58717,-3.23217 0.29305,-8.02051 -3.84929,-8.02051h-11.22591v-43c0,-11.87517 -9.62483,-21.5 -21.5,-21.5zM28.66667,39.68262c-1.86333,0 -3.72823,0.80222 -5.01107,2.40755l-17.23079,21.55599c-2.58717,3.23217 -0.29305,8.02051 3.84928,8.02051h11.22591v43c0,11.87517 9.62483,21.5 21.5,21.5h64.486c6.01283,0 9.35429,-6.95167 5.59896,-11.64583c-1.36167,-1.6985 -3.42029,-2.6875 -5.59896,-2.6875h-64.486c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667v-43h11.22591c4.14233,0 6.43645,-4.78834 3.84928,-8.02051l-17.23079,-21.55599c-1.28283,-1.60533 -3.14773,-2.40755 -5.01107,-2.40755z"></path>
              </g>
            </g>
          </svg>
        </Box>
      )}
    </>
  );
};

export default Retweet;
