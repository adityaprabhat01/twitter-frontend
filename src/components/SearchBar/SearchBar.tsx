import { Button, FormControl, Input } from "@chakra-ui/react"
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
      <FormControl onSubmit={handleSubmit} maxWidth={'300px'}>
        <Input onChange={handleValue} type="text" id="value" />
        <br />
        <Button mt={2} onClick={handleSubmit} type="submit" value="Submit">
          Search
        </Button>
      </FormControl>
    </>
  )
}

export default SearchBar;