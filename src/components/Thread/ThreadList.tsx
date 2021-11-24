import { useEffect } from "react";
import { URL } from "../../url"
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchThread, fetchThreadFailure, fetchThreadSuccess } from "../../store/thread/threadAction";
import Tweet from "../Tweet/Tweet";
import ShowComment from "../Comment/ShowComment";

const ThreadList = () => {
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const x = useSelector((state: RootStateOrAny) => state)
  useEffect(() => {
    type Params = { tweet_id: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).tweet_id !== undefined;
    }
    if(isParams(params))  {
      dispatch(fetchThread())
      fetch(URL + 'fetchThread/' + params.tweet_id)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        dispatch(fetchThreadSuccess(res))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchThreadFailure())
      })
      
    }
  }, [history.location.pathname])
  

  return (
    <>
      ThreadList
      <Tweet tweet={x.thread.tweet} />
      {
        x.thread.comments.map(comment =>  {
        return <ShowComment comment={comment} />
      })
      }
    </>
  )
}

export default ThreadList