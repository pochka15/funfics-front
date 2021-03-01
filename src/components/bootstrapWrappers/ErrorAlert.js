import React from 'react';
import {Form} from "react-bootstrap";

function ErrorAlert({errorMessage}) {
  return (
    <Form.Group>
      <div className={"alert alert-danger"} role={"alert"}>
        {errorMessage}
      </div>
    </Form.Group>

  );
}

export default ErrorAlert;