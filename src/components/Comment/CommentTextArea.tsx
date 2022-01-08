import { useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { URL } from "../../url";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { postCommentThread } from "../../store/thread/threadAction";
import { homePostComment } from "../../store/home/homeAction";
import { postComment } from "../../store/tweet/tweetAction";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";

const CommentTextArea = (props) => {
  const [toggle, setToggle] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const x = useSelector((state: RootStateOrAny) => state);
  const { setCount, count } = props;
  function handleToggle() {
    setToggle(!toggle);
  }
  function handleTextArea(event) {
    console.log(event.target.value);
    setCommentText(event.target.value);
  }

  async function postCommentAndCount() {
    const db = getFirestore();
    try {
      const obj = {
        tweet_id: props.props.tweet.tweet_id,
        author_id: x.auth.user_id,
        author_name: x.auth.name,
        author_username: x.auth.user_name,
        comment_text: commentText,
        rplies: [],
      };
      const docRef = await addDoc(collection(db, "comments"), obj);
      fetch(URL + "plusComment/" + props.props.tweet.tweet_id, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.comment_count);
          setCount(res.comment_count);
        });
      obj["_id"] = docRef.id;
      console.log(obj);
      dispatch(postCommentThread(obj));
      dispatch(homePostComment(obj));
      dispatch(postComment(obj));
      setToggle(!toggle);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <Box mt={"4"} onClick={handleToggle}>
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
              <path d="M86,16.90382c-37.9737,0 -68.86719,30.89348 -68.86719,68.86719c0,13.84499 4.09224,27.19506 11.83392,38.60853c0.29361,0.43269 0.36868,0.97781 0.2034,1.47432l-9.74744,29.24231l31.20085,-9.60046c0.44344,-0.13538 0.92324,-0.0838 1.32603,0.14631c10.32537,5.88563 22.09978,8.99617 34.05042,8.99617c37.97337,0 68.86719,-30.89382 68.86719,-68.86719c0,-37.9737 -30.89382,-68.86719 -68.86719,-68.86719zM59.125,77.37257c4.6309,0 8.39844,3.76754 8.39844,8.39844c0,4.6309 -3.76754,8.39844 -8.39844,8.39844c-4.6309,0 -8.39844,-3.76754 -8.39844,-8.39844c0,-4.6309 3.76754,-8.39844 8.39844,-8.39844zM86,77.37257c4.6309,0 8.39844,3.76754 8.39844,8.39844c0,4.6309 -3.76754,8.39844 -8.39844,8.39844c-4.6309,0 -8.39844,-3.76754 -8.39844,-8.39844c0,-4.6309 3.76754,-8.39844 8.39844,-8.39844zM112.875,77.37257c4.6309,0 8.39844,3.76754 8.39844,8.39844c0,4.6309 -3.76754,8.39844 -8.39844,8.39844c-4.6309,0 -8.39844,-3.76754 -8.39844,-8.39844c0,-4.6309 3.76754,-8.39844 8.39844,-8.39844zM59.125,80.73195c-2.77854,0 -5.03906,2.26052 -5.03906,5.03906c0,2.77854 2.26052,5.03906 5.03906,5.03906c2.77854,0 5.03906,-2.26052 5.03906,-5.03906c0,-2.77854 -2.26052,-5.03906 -5.03906,-5.03906zM86,80.73195c-2.77854,0 -5.03906,2.26052 -5.03906,5.03906c0,2.77854 2.26052,5.03906 5.03906,5.03906c2.77854,0 5.03906,-2.26052 5.03906,-5.03906c0,-2.77854 -2.26052,-5.03906 -5.03906,-5.03906zM112.875,80.73195c-2.77854,0 -5.03906,2.26052 -5.03906,5.03906c0,2.77854 2.26052,5.03906 5.03906,5.03906c2.77854,0 5.03906,-2.26052 5.03906,-5.03906c0,-2.77854 -2.26052,-5.03906 -5.03906,-5.03906z"></path>
            </g>
          </g>
        </svg>
      </Box>
      {toggle === false ? null : (
        <>
          <Textarea onChange={handleTextArea} />
          <Button onClick={postCommentAndCount}>Post</Button>
        </>
      )}
    </>
  );
};

export default CommentTextArea;
