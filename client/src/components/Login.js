import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    setUsername(event.target.value);
  };

  const handleChange2 = event => {
    setPassword(event.target.value);
  };

  const submitUserDetails = e => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("http://localhost:5006/api/login", { username, password })
      .then(res => {
        debugger;
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Login Here</p>
      <form onSubmit={submitUserDetails}>
        <label>Username</label>
        <input value={username} onChange={handleChange} type="text" />
        <label>Password</label>
        <input value={password} onChange={handleChange2} type="password" />
        <button disabled={isLoading}>Submit</button>
      </form>
    </>
  );
};

export default Login;
