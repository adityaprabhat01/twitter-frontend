import { useState } from 'react'
import { Button, Textarea } from "@chakra-ui/react"
import { URL } from '../../url'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

const CommentTextArea = (props) => {
  const [toggle, setToggle] = useState(false)
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()
  const x = useSelector((state: RootStateOrAny) => state)

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
        tweet_id: props.tweet.tweet_id,
        author_id: x.auth.user_id,
        author_name: x.auth.name,
        author_username: x.auth.user_name,
        comment_text: commentText
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setToggle(!toggle)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Button onClick={handleToggle}>Comment</Button>
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