import { useState } from 'react'
import { Box, Button, Textarea } from "@chakra-ui/react"
import { URL } from '../../url'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { postCommentThread } from '../../store/thread/threadAction'
import { homePostComment } from '../../store/home/homeAction'

const CommentTextArea = (props) => {
  const [toggle, setToggle] = useState(false)
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()
  const x = useSelector((state: RootStateOrAny) => state)
  const { setCount, count } = props
  function handleToggle() {
    setToggle(!toggle)
  }
  function handleTextArea(event) {
    setCommentText(event.target.value)
  }
  function handlePostComment() {
    fetch(URL + 'postComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify({
        tweet_id: props.props.tweet.tweet_id,
        author_id: x.auth.user_id,
        author_name: x.auth.name,
        author_username: x.auth.user_name,
        comment_text: commentText
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(postCommentThread(res))
      dispatch(homePostComment(res))
      setToggle(!toggle)
      setCount(count+1)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Box mt={"4"} onClick={handleToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
        </svg>
      </Box>
      {
        toggle === false ?
        null :
        <>
          <Textarea onChange={handleTextArea} />
          <Button onClick={handlePostComment}>Post</Button>
        </>
      }
    </>
  )
}

export default CommentTextArea