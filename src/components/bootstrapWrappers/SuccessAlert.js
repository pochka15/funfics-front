import React from "react";
import { Form } from "react-bootstrap";

function SuccessAlert({ successMessage }) {
  return (
    <Form.Group>
      <div className="alert alert-success" role="alert">
        {successMessage}
      </div>
    </Form.Group>
  );
}

export default SuccessAlert;
