import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInAction, fetchUser } from "../../store/auth/authAction";
import { useHistory } from "react-router-dom";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const x = useSelector(state => state)

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
      })
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
      history.push('/profile/' + user_name)
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Email:</label>
        <br />
        <input onChange={handleEmail} type="text" id="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input onChange={handlePassword} type="text" id="password" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignIn;
