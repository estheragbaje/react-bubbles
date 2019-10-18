import React, { useState } from "react";
import axios from "axios";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button
} from "@chakra-ui/core";

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
        // debugger;
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <Heading textAlign="center">Welcome to the Bubble App!</Heading>
      <Text>Login Here</Text>
      <Stack mt="50px" marginX="500px">
        <form onSubmit={submitUserDetails}>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={handleChange} type="text" />
          <FormLabel marginTop="20px">Password</FormLabel>
          <Input value={password} onChange={handleChange2} type="password" />
          <Button
            paddingX="155px"
            type="submit"
            bg="#dd9a99"
            marginTop="30px"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default Login;
