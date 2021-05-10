import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { changePassword } from "../../api/userActivityApi";
import { AuthContext } from "../../contexts/AuthContext";

function ChangePasswordForm() {
  const { register, handleSubmit } = useForm();
  const auth = React.useContext(AuthContext);

  function onSubmit(passwords) {
    changePassword(auth.token, passwords.curPassword, passwords.newPassword)
      .then(() => console.log("Password is changed"))
      .catch(console.log);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Current password</Form.Label>
          <Form.Control
            name="curPassword"
            ref={register}
            type="password"
            placeholder="..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New password</Form.Label>
          <Form.Control
            ref={register}
            name="newPassword"
            type="password"
            placeholder="..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change password
        </Button>
      </Form>
    </div>
  );
}

export default ChangePasswordForm;
