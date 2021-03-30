import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  blockUser,
  deleteUserById,
  fetchUser,
  unblockUser,
  updateUserRoles,
} from "../../api/adminApi";
import { AuthContext } from "../../contexts/AuthContext";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import User from "../../dto/user";
import UserRolesForm from "./UserRolesForm";

function UserSettings() {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchUser(
        id,
        auth.token,
        (user) => {
          setUser(
            new User(
              user.enabled ? "Active" : "Inactive",
              user.name,
              user.id,
              user.registrationIsoDateTime,
              user.lastLoginIsoDateTime,
              user.roles.join(", ")
            )
          );
        },
        (error) => console.log(error)
      );
    }
  }, [auth, id]);

  const userData = user && (
    <ul>
      <li>Name: {user.name}</li>
      <li>Id: {user.id}</li>
      <li>Registered: {user.registrationIsoDateTime.split("T")[0]}</li>
      <li>Status: {user.status}</li>
      <li>Roles: {user.roles}</li>
    </ul>
  );

  function onDelete() {
    deleteUserById(
      id,
      auth.token,
      () => console.log(`Deleted ${id}`),
      (error) => console.log(error)
    );
  }

  function onBlock() {
    blockUser(
      id,
      auth.token,
      () => console.log(`Blocked ${id}`),
      (error) => console.log(error)
    );
  }

  function updateRoles(roles) {
    updateUserRoles(
      id,
      roles,
      auth.token,
      () => console.log(`User ${id} is now with roles: ${roles}`),
      (error) => console.log(error)
    );
  }

  function onUnblock() {
    unblockUser(
      id,
      auth.token,
      () => console.log(`Unblocked ${id}`),
      (error) => console.log(error)
    );
  }

  return (
    <Container>
      {user ? userData : <CustomSpinner />}
      <Row>
        <Form inline>
          <Col>
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={onBlock}>
              Block
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={onUnblock}>
              Unblock
            </Button>
          </Col>
        </Form>
      </Row>
      <Row>
        <Col>
          <UserRolesForm onRolesChosen={updateRoles} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserSettings;
