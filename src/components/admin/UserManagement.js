import React, {useCallback, useContext, useEffect, useState} from 'react';
import UsersTable from "./UsersTable";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import {Container} from "react-bootstrap";
import {defaultAuthConfig, receiveData} from "../../utils/communicationWithServer";
import ApiUrls from "../../apiUrls";
import {AuthContext} from "../../contexts/AuthContext";
import User from "../../dto/user";

function UserManagement() {
  const [users, setUsers] = useState(undefined)
  const auth = useContext(AuthContext)

  const reloadUsersData = useCallback(() => {
    if (auth.isAuthenticated) {
      receiveData(ApiUrls.ADMIN_USERS,
        defaultAuthConfig(auth.token),
        (usersData) => setUsers(configured(usersData)),
        (error) => console.log(error.message))
    }
  }, [auth])

  useEffect(() => {
    reloadUsersData();
  }, [auth, reloadUsersData])

  function configured(users) {
    return users.map(user => new User(
      user.enabled ? "Enabled" : "Disabled",
      user.name,
      user.id,
      user.registrationDate,
      user.roles.join(", ")));
  }

  return (
    <Container>
      {users
        ? <UsersTable reloadUsers={reloadUsersData} users={users}/>
        : <div className="Centered"><CustomSpinner/></div>}
    </Container>
  );
}

export default UserManagement;