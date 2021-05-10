import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChangePasswordForm from "./userActivity/ChangePasswordForm";
import UserFunfics from "./funfics/UserFunfics";

function UserAccount() {
  return (
    <Container>
      <Row>
        <Col>
          <ChangePasswordForm />
        </Col>
        <Col>
          <UserFunfics />
        </Col>
      </Row>
    </Container>
  );
}

export default UserAccount;
