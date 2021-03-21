import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function UserRolesForm({ onRolesChosen }) {
  const { register, handleSubmit } = useForm();

  function updateRoles(data) {
    const arr = [];
    if (data.user) arr.push("USER");
    if (data.admin) arr.push("ADMIN");
    onRolesChosen(arr);
  }

  return (
    <Form onSubmit={handleSubmit(updateRoles)}>
      <Form.Check label="Admin" ref={register} name="admin" />
      <Form.Check label="User" ref={register} name="user" />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UserRolesForm;
