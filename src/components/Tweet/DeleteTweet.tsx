import { Box } from "@chakra-ui/react";
import { URL } from "../../url";
import { useSelector, useDispatch } from "react-redux";
import { updateDeletedTweet } from "../../store/tweet/tweetAction";

const DeleteTweet = (props) => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    return { user_id }
  }
  const store = useSelector(handleSelector)
  const dispatch = useDispatch();
  
  function handleDelete() {
    fetch(URL + "deleteTweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_id: props.tweet.user_id,
        tweet_id: props.tweet.tweet_id,
        user_id: store.user_id,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(updateDeletedTweet(res));
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Box onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
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
            <g fill="#e74c3c">
              <path d="M77.44759,14.33333c-3.70517,0 -7.24517,1.46424 -9.86817,4.08724l-3.07943,3.07943h-35.83333c-2.58456,-0.03655 -4.98858,1.32136 -6.29153,3.55376c-1.30295,2.2324 -1.30295,4.99342 0,7.22582c1.30295,2.2324 3.70697,3.59031 6.29153,3.55376h114.66667c2.58456,0.03655 4.98858,-1.32136 6.29153,-3.55376c1.30295,-2.2324 1.30295,-4.99342 0,-7.22582c-1.30295,-2.2324 -3.70697,-3.59031 -6.29153,-3.55376h-35.83333l-3.07943,-3.07943c-2.61583,-2.623 -6.163,-4.08724 -9.86816,-4.08724zM31.28418,50.16667l10.94596,95.05632c0.946,7.095 7.05502,12.44368 14.20736,12.44368h59.111c7.15233,0 13.26819,-5.34018 14.22135,-12.49968l10.94597,-95.00032z"></path>
            </g>
          </g>
        </svg>
      </Box>
    </>
  );
};

export default DeleteTweet;
