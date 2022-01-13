import { useHistory } from "react-router"
import TwitterButton from "../UI/TwitterButton"

const Following = (props) => {
  const history = useHistory()
  function handleFollowing() {
      history.push(`/followingList/${props.user_id}`)
  }
  return (
    <>
      <TwitterButton method={handleFollowing} text={'Following'} />
    </>
  )
}

export default Following;