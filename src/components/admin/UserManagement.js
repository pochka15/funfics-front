import React, {useCallback, useContext, useEffect, useState} from 'react';
import UsersTable from "./UsersTable";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import {Container} from "react-bootstrap";
import {defaultAuthConfig, receiveData} from "../../utils/communicationWithServer";
import ApiUrls from "../../apiUrls";
import {AuthContext} from "../../contexts/AuthContext";
import User from "../../dto/user";

function UserManagement() {
  const [tableUsers, setTableUsers] = useState(undefined)
  const auth = useContext(AuthContext)

  const reloadUsersData = useCallback(() => {
    if (auth.isAuthenticated) {
      receiveData(ApiUrls.ADMIN_USERS,
        defaultAuthConfig(auth.token),
        (usersData) => setTableUsers(usersData.map(toUser).map(addRegistrationDate)),
        (error) => console.log(error.message))
    }
  }, [auth])

  useEffect(() => {
    reloadUsersData();
  }, [auth, reloadUsersData])

  function toUser(user) {
    return new User(user.enabled ? "Enabled" : "Disabled",
      user.name,
      user.id,
      user.registrationIsoDateTime,
      user.lastLoginIsoDateTime,
      user.roles.join(", "))
  }

  function addRegistrationDate(user) {
    return {
      ...user,
      registrationDate: user.registrationIsoDateTime.split("T")[0]
    }
  }

  return (
    <Container>
      {tableUsers
        ? <UsersTable reloadUsers={reloadUsersData} users={tableUsers}/>
        : <div className="Centered"><CustomSpinner/></div>}
    </Container>
  );
}

export default UserManagement;