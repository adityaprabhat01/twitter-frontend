import { useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import {
  homeAddLikedTweets,
  homeRemoveLikedTweets,
} from "../../store/home/homeAction";
import { Box, HStack } from "@chakra-ui/react";
import { URL } from "../../url";

const Like = (props) => {
  const x = useSelector((state: RootStateOrAny) => state);
  const { tweet } = props;
  const { tweet_id, author_id } = tweet;
  const likedStatus = x.home.liked;
  const dispatch = useDispatch();
  const [count, setCount] = useState(tweet.likes_count);

  function handleLike() {
    fetch(URL + "like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id,
        tweet_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const { tweet_id, status } = res;
        const obj = {
          tweet_id,
          liked: status,
        };
        dispatch(homeAddLikedTweets(obj));
        setCount(count + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUnlike() {
    fetch(URL + "unlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: x.auth.user_id,
        author_id,
        tweet_id: tweet_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const { tweet_id } = res;
        dispatch(homeRemoveLikedTweets(tweet_id));
        setCount(count - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <HStack>
        { likedStatus[tweet.tweet_id] === undefined ? (
          <Box onClick={handleLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 172 172"
              style={{fill:'#000000'}}
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
                style={{mixBlendMode: 'normal'}}
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#3498db">
                  <path d="M118.25,21.5c-20.7475,0 -32.25,14.97833 -32.25,14.97833c0,0 -11.5025,-14.97833 -32.25,-14.97833c-21.77233,0 -39.41667,17.64433 -39.41667,39.41667c0,29.89217 35.20267,58.85983 45.01383,68.01167c11.30183,10.535 26.65283,24.08 26.65283,24.08c0,0 15.351,-13.545 26.65283,-24.08c9.81117,-9.15183 45.01383,-38.1195 45.01383,-68.01167c0,-21.77233 -17.64433,-39.41667 -39.41667,-39.41667zM106.1455,115.455c-1.2685,1.14667 -2.37217,2.14283 -3.268,2.98133c-5.38217,5.01667 -11.74617,10.7715 -16.8775,15.3725c-5.13133,-4.601 -11.5025,-10.363 -16.8775,-15.3725c-0.903,-0.8385 -2.00667,-1.84183 -3.268,-2.98133c-10.17667,-9.19483 -37.18783,-33.61883 -37.18783,-54.53833c0,-13.83167 11.25167,-25.08333 25.08333,-25.08333c13.0935,0 20.683,9.1375 20.88367,9.374l11.36633,12.126l11.36633,-12.126c0.07167,-0.09317 7.79017,-9.374 20.88367,-9.374c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,20.9195 -27.01117,45.3435 -37.18783,54.53833z"></path>
                </g>
              </g>
            </svg>
          </Box>
        ) : (
          <Box onClick={handleUnlike}>
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
                <g fill="#e74c3c">
                  <path d="M54.72422,22.93333c-20.726,0 -37.52422,16.79822 -37.52422,37.52422c0,36.07642 41.84746,70.54796 61.39817,85.89922c0.01862,0.01499 0.03728,0.02992 0.05599,0.04479c0.13396,0.10517 0.31608,0.25498 0.44792,0.35833l0.0112,-0.0112c1.98358,1.4988 4.40056,2.31232 6.88672,2.31797c2.48999,-0.00322 4.91127,-0.81686 6.89792,-2.31797v0.0112c0.03859,-0.03025 0.09561,-0.07038 0.13437,-0.10078c0.02948,-0.02312 0.0712,-0.05517 0.10079,-0.07839c0.03755,-0.03335 0.07487,-0.06694 0.11198,-0.10078c19.49011,-15.2961 61.55495,-49.85989 61.55495,-86.02239c0,-20.726 -16.79822,-37.52422 -37.52422,-37.52422c-19.80867,0 -31.27578,17.2 -31.27578,17.2c0,0 -11.46711,-17.2 -31.27578,-17.2z"></path>
                </g>
              </g>
            </svg>
          </Box>
        )}
        <Box as='span'>
          {
            count 
          }
        </Box>
        

      </HStack>
      
    </>
  );
};

export default Like;
