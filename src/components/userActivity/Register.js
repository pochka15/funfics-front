import React, { useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/userActivityApi";
import { useHistory } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm();
  const emailRef = useRef();
  const history = useHistory();
  const onSubmit = (data) => {
    signUp(
      data,
      () => {
        history.push("/login");
      },
      () => console.log("Registration error")
    );
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            ref={(e) => {
              register(e);
              emailRef.current = e;
            }}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            ref={register}
            type="input"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            ref={register}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formIsAdmin">
          <Form.Check name="isAdmin" ref={register} label="Admin" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
