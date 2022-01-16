import { Box, Button, Textarea } from "@chakra-ui/react";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import 'firebase/firestore'
import {db} from '../../firebase'
import { updateCommentThread } from "../../store/thread/threadAction";

const ReplyTextArea = (props) => {
  console.log(props)
  const { tweet_id, comment_id, id_firestore, parentId } = props;
  const handleSelector = (state) => {
    const user_id = state.auth.user_id;
    const name = state.auth.name;
    const user_name = state.auth.user_name;
    const comments = state.thread.comments
    return { user_id, user_name, name, comments };
  };
  const store = useSelector(handleSelector);
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false);
  const [replyText, setReplyText] = useState("");
  function handleToggle() {
    setToggle(!toggle);
  }
  function handleTextArea(event) {
    setReplyText(event.target.value);
  }

  function updateCommentObject(obj, parentId, newReply, semaphore) {
    
    if (obj.comment_id === parentId) {
      obj.replies.push(newReply);
      semaphore = true
      return { newObj: obj, rec: semaphore };
    }

    for (let i = 0; i < obj.replies.length; i++) {
      console.log(obj.tweet_id, parentId, obj.reply_id)

      if (obj.replies[i].reply_id === parentId && !semaphore) {
        obj.replies[i].replies.push(newReply);
        semaphore = true
        return { newObj: obj, rec: semaphore };
      }
      
      if(!semaphore) {
        const { newObj, rec } = updateCommentObject(obj.replies[i], parentId, newReply, semaphore);
        semaphore = rec;
        obj.replies[i] = newObj
      }      
    }

    return { newObj: obj, rec: semaphore };
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
        const { newObj, rec } = updateCommentObject(comment, parentId, newReply, false)
        console.log(newObj)
        await setDoc(doc(db, "comments", id_firestore), newObj);

        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("tweet_id", "==", newObj.tweet_id));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs
        dispatch(updateCommentThread(data));
        handleToggle()
      }
    }
  }

  return (
    <>
      <Box>
        <Button onClick={handleToggle}>Reply</Button>
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
