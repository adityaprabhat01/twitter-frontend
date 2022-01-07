import { useEffect, useState } from "react";
import { URL } from "../../url"
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchThread, fetchThreadFailure, fetchThreadSuccess } from "../../store/thread/threadAction";
import Tweet from "../Tweet/Tweet";
import ShowComment from "../Comment/ShowComment";
import { collection, doc, setDoc, getFirestore, query, where, getDocs } from "firebase/firestore"; 

const ThreadList = () => {
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const x = useSelector((state: RootStateOrAny) => state)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    type Params = { tweet_id: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).tweet_id !== undefined;
    }
    if(isParams(params))  {
      dispatch(fetchThread())
      fetch(URL + 'fetchThread/' + params.tweet_id, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(async (res) => {
        const db = getFirestore();
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, where("tweet_id", "==", params.tweet_id));
        const querySnapshot = await getDocs(q);
        res.push(querySnapshot.docs)
        dispatch(fetchThreadSuccess(res))
        setLoading(false)
      })
      .catch(err => {
        dispatch(fetchThreadFailure())
      })
      
    }
  }, [history.location.pathname])

  return (
    <>
      ThreadList 
      {
        loading === true ? 'loading' :
        <Tweet tweet={x.thread.tweet} />
      }
      {
        loading === true ? 'loading' :
        x.thread.comments.map(comment =>  {
        return <ShowComment comment={comment} />
      })
      }
    </>
  )
}

export default ThreadList