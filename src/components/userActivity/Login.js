import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Container, Form } from "react-bootstrap";
import { login } from "../../api/userActivityApi";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  const usernameRef = useRef();
  const auth = useContext(AuthContext);
  const history = useHistory();

  function onSubmit(credentials) {
    login(credentials)
      .then((data) => {
        auth.login(data.jwt);
        history.push(`/`);
      })
      .catch(console.log);
  }

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="input"
            placeholder="Enter username"
            ref={(e) => {
              register(e);
              usernameRef.current = e;
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={register}
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
