import { useHistory } from "react-router";
import { URL } from "../../url";
import TwitterButton from "../UI/TwitterButton";

const LogOut = () => {
  const history = useHistory()
  
  function handleLogOut(event) {
    fetch(URL + 'logout', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      history.push('/signin');
    })
  }
  return (
    <>
      <TwitterButton method={handleLogOut} text={"Logout"} />
    </>
  )
}

export default LogOut;