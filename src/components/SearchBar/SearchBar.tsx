import { SetStateAction, useState } from "react"
import { useHistory } from "react-router"
import { URL } from "../../url"

const SearchBar = () => {
  const [user_name, setUser_name] = useState('')
  const history = useHistory()
  function handleValue(event: { target: { value: SetStateAction<string> } }) {
    setUser_name(event.target.value)
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    fetch(URL + 'checkExistence/' + user_name.toString(), {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.found === true) {
        history.push('/profile/' + user_name)
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleValue} type="text" id="value" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default SearchBar;