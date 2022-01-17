import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import Error from "../UI/Error";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError]  = useState('')

  function handleEmail(event: { target: { value: React.SetStateAction<string>; }; }) {
    setEmail(event.target.value)
  }
  function handlePassword(event: { target: { value: React.SetStateAction<string>; }; }) {
    setPassword(event.target.value)
  }
  function handleName(event: { target: { value: React.SetStateAction<string>; }; }) {
    setName(event.target.value)
  }
  function handleUsername(event: { target: { value: React.SetStateAction<string>; }; }) {
    setUsername(event.target.value)
  }

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const url = "http://localhost:4000/signUp"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        username
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        setError(res.error)
      }
      console.log(res)
    })
  }

  return (
    <>
      <Flex align="center" width="full" justifyContent="center">
        <form onSubmit={handleSubmit}>
          <Box px={4} py={4} bg={"#EDF2F7"}>
          <FormControl>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input placeholder="Email" onChange={handleEmail} type="text" id="email" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input placeholder="Password" onChange={handlePassword} type="text" id="password" />
          </FormControl>
          
          <FormControl>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input placeholder="Name" onChange={handleName} type="text" id="name" />
          </FormControl>
          
          <FormControl>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input placeholder="Username" onChange={handleUsername} type="text" id="username" />
          </FormControl>
          
          <FormControl>
            <Button bg={"#A0AEC0"} onClick={handleSubmit} mt={4}>Sign Up</Button>
          </FormControl>
          <Error message={error} />
          </Box>          
        </form>
      </Flex>
      
    </>
  );
};

export default SignUp;
