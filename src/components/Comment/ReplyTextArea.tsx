import { Box, Button, Textarea } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";

import { useState } from "react";
import { useSelector } from "react-redux";

import 'firebase/firestore'
import {db} from '../../firebase'

const ReplyTextArea = (props) => {
  
  const { tweet_id, comment_id, id_firestore, parentId, text } = props;
  let semaphore = false;
  const handleSelector = (state) => {
    const user_id = state.auth.user_id;
    const name = state.auth.name;
    const user_name = state.auth.user_name;
    const comments = state.thread.comments
    return { user_id, user_name, name, comments };
  };
  const store = useSelector(handleSelector);
  const [toggle, setToggle] = useState(false);
  const [replyText, setReplyText] = useState("");
  function handleToggle() {
    setToggle(!toggle);
  }
  function handleTextArea(event) {
    setReplyText(event.target.value);
  }

  function updateCommentObject(obj, parentId, newReply) {
    if (obj.replies.length === 0) {
      obj.replies.push(newReply);
      return obj;
    }
    for (let i = 0; i < obj.replies.length; i++) {
      if (obj.replies[i].reply_id === parentId && !semaphore) {
        obj.replies.push(newReply);
        semaphore = true;
        return obj;
      }
      updateCommentObject(obj.replies[i], parentId, newReply);
    }
    return obj;
  }

  async function handleSubmit() {
    const newReply = {
      reply_id: Date.now(),
      author_id: store.user_id,
      author_name: store.name,
      author_username: store.user_name,
      comment_text: replyText,
      replies: [],
    };

    for(let i=0;i<store.comments.length;i++) {
      const comment = store.comments[i].data();
      if(comment.comment_id === comment_id) {
        console.log(comment)
        const newObj = updateCommentObject(comment, parentId, newReply)
        console.log(newObj)
        await setDoc(doc(db, "comments", id_firestore), newObj);
      }
    }
  }

  return (
    <>
      <Box>
        <Button onClick={handleToggle}>{text}</Button>
        {toggle === true ? (
          <Box>
            <Textarea onChange={handleTextArea} />
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default ReplyTextArea;
