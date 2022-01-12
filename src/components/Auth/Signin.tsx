import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInAction, fetchUser } from "../../store/auth/authAction";
import { useHistory } from "react-router-dom";
import { Button, Flex, FormControl, Input } from "@chakra-ui/react";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const history = useHistory()

  function handleEmail(event: { target: { value: React.SetStateAction<string>; }; }) {
    setEmail(event.target.value)
  }
  function handlePassword(event: { target: { value: React.SetStateAction<string>; }; }) {
    setPassword(event.target.value)
  }

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    dispatch(fetchUser())
    const url = "http://localhost:4000/signIn"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      const { user_id, user_name, name } = res;
      const data = {
        user_id,
        user_name,
        name
      }
      dispatch(signInAction(data))
      history.push('/homepage')
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Flex width="full"  justifyContent="center">
        <form onSubmit={handleSubmit} >
          <FormControl>
            <label htmlFor="fname">Email:</label>
            <Input placeholder="Email" onChange={handleEmail} type="text" id="email" />
            </FormControl>
            <FormControl>
            <label htmlFor="password">Password:</label>
            <Input placeholder="Password" onChange={handlePassword} type="text" id="password" />
            </FormControl>
            <FormControl>
            <Button mt={2} onClick={handleSubmit}>Log In</Button>
            </FormControl>
        </form>
      </Flex>
    </>
  );
};

export default SignIn;
