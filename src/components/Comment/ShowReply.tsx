import { createElement, DetailedReactHTMLElement } from "react";
import User from "../UI/User";
import Reply from "./Reply";

const ShowReply = (props) => {
  const { replies, tweet_id, comment_id, id_firestore } = props;

  function createReplies(obj) {
    let children: DetailedReactHTMLElement<{}, HTMLElement>[] = [];
    for (let i = 0; i < obj.replies.length; i++) {
      const user = (
        <User
          user_id={undefined}
          author_id={obj.replies[i].author_id}
          name={obj.replies[i].author_name}
          user_name={obj.replies[i].author_username}
          tweet_id={obj.replies[i].reply_id}
          handleSubmit={null}
        />
      );
      const combined = (
        <span>
          {createElement("div", {}, obj.replies[i].comment_text)}
          <Reply comment_id={comment_id} id_firestore={id_firestore} parentId={obj.replies[i].reply_id} text={obj.replies[i].comment_text} />
        </span>
      )
      const curr = createElement('div', {}, [
        user,
        combined
      ])
      if (obj.replies.length === 0) continue;
      const furtherReplies = createReplies(obj.replies[i]);
      const item = createElement("div", {
        style: {marginLeft: "40px"}
      }, [curr, furtherReplies]);
      children.push(item);
    }
    return children;
  }

  const wrapper = createReplies(replies);

  return (
    <>
      {createElement("div", {}, wrapper)}
      <Reply tweet_id={tweet_id} comment_id={comment_id} id_firestore={id_firestore} text='Reply' parentId={comment_id} />
    </>
  );
};

export default ShowReply;
