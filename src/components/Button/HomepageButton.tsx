import { useHistory } from "react-router"
import TwitterButton from "../UI/TwitterButton"

const HomepageButton = (props) => {
  const history = useHistory()
  function handleHomepage() {
      history.push('/homepage')
  }
  return (
    <>
      <TwitterButton method={handleHomepage} text={'Homepage'} />
    </>
  )
}

export default HomepageButton;