import React, { useCallback, useContext, useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import User from "../../dtos/user";
import { fetchAllUsers } from "../../api/adminApi";

function UserManagement() {
  const [tableUsers, setTableUsers] = useState(undefined);
  const auth = useContext(AuthContext);

  const reloadUsersData = useCallback(() => {
    if (auth.isAuthenticated) {
      fetchAllUsers(auth.token)
        .then((users) =>
          setTableUsers(users.map(toUser).map(addRegistrationDate))
        )
        .catch(console.log);
    }
  }, [auth]);

  useEffect(() => {
    reloadUsersData();
  }, [auth, reloadUsersData]);

  function toUser(user) {
    return new User(
      user.enabled ? "Enabled" : "Disabled",
      user.name,
      user.id,
      user.registrationIsoDateTime,
      user.lastLoginIsoDateTime,
      user.roles.join(", ")
    );
  }

  function addRegistrationDate(user) {
    return {
      ...user,
      registrationDate: user.registrationIsoDateTime.split("T")[0],
    };
  }

  return (
    <Container>
      {tableUsers ? (
        <UsersTable reloadUsers={reloadUsersData} users={tableUsers} />
      ) : (
        <div className="Centered">
          <CustomSpinner />
        </div>
      )}
    </Container>
  );
}

export default UserManagement;
