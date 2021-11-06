import React, { useState } from "react";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

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
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify({
        email,
        password,
        name,
        username
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <br />
        <input onChange={handleEmail} type="text" id="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input onChange={handlePassword} type="text" id="password" />
        <br />
        <label htmlFor="name">Name:</label>
        <br />
        <input onChange={handleName} type="text" id="name" />
        <br />
        <label htmlFor="username">Username:</label>
        <br />
        <input onChange={handleUsername} type="text" id="username" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
