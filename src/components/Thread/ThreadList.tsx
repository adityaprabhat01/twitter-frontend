import { useEffect, useState } from "react";
import { URL } from "../../url"
import { useParams } from 'react-router';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchThread, fetchThreadFailure, fetchThreadSuccess } from "../../store/thread/threadAction";
import Tweet from "../Tweet/Tweet";
import ShowComment from "../Comment/ShowComment";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore"; 
import { Spinner } from "@chakra-ui/react";

const ThreadList = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const x = useSelector((state: RootStateOrAny) => state)
  const [loading, setLoading] = useState(true)
  const controller = new AbortController()

  useEffect(() => {
    type Params = { tweet_id: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).tweet_id !== undefined;
    }
    if(isParams(params))  {
      dispatch(fetchThread())
      fetch(URL + 'fetchThread/' + params.tweet_id, {
        credentials: 'include',
        signal: controller.signal
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

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      ThreadList 
      {
        loading === true ? <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /> :
        <Tweet tweet={x.thread.tweet} />
      }
      {
        loading === true ? <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      /> :
        x.thread.comments.map(comment =>  {
        return <ShowComment comment={comment} />
      })
      }
    </>
  )
}

export default ThreadList