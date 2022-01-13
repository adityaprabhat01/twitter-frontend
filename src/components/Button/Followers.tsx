import { useHistory } from "react-router"
import TwitterButton from "../UI/TwitterButton"

const Followers = (props) => {
  const history = useHistory()
  function handleFollowers() {
      history.push(`/followersList/${props.user_id}`)
  }
  return (
    <>
      <TwitterButton method={handleFollowers} text={'Followers'} />
    </>
  )
}

export default Followers