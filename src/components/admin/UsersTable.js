import React, {useContext, useState} from 'react';
import {CBadge, CButton, CCardBody, CCollapse, CDataTable} from "@coreui/react";
import {useHistory} from "react-router-dom";
import {deleteUserById, makeAdmin} from "../../api/adminApi";
import {AuthContext} from "../../contexts/AuthContext";

/**
 * Core ui template table
 * @param users - array of users
 * @param reloadUsers
 * @returns {JSX.Element}
 * @constructor
 */
function UsersTable({users, reloadUsers}) {
  const [details, setDetails] = useState([])
  const auth = useContext(AuthContext)
  const history = useHistory()

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    {key: 'name', _style: {width: '40%'}},
    'registered',
    {key: 'roles', _style: {width: '20%'}},
    {key: 'status', _style: {width: '20%'}},
    {
      key: 'show_details',
      label: '',
      _style: {width: '1%'},
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Enabled':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Disabled':
        return 'danger'
      default:
        return 'primary'
    }
  }

  function onMakeAdmin(id) {
    makeAdmin(id,
      auth.token,
      () => {
        console.log(`User ${id} is now admin`)
        reloadUsers();
      },
      error => console.log(error));
  }

  return (
    <CDataTable
      items={users}
      fields={fields}
      columnFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        'status':
          (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>
                {item.status}
              </CBadge>
            </td>
          ),
        'show_details':
          (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index)
                  }}
                >
                  {details.includes(index) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
        'details':
          (item, index) => {
            function onDelete() {
              deleteUserById(item.id,
                auth.token,
                () => {
                  console.log(`Deleted ${item.id}`);
                  reloadUsers();
                },
                error => console.log(error));
            }

            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>
                    {item.username}
                  </h4>
                  <p className="text-muted">User since: {item.registered}</p>
                  <CButton onClick={() => history.push(`/admin/user-settings/${item.id}`)} size="sm" color="info">
                    User Settings
                  </CButton>
                  <CButton onClick={onDelete} size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton>
                  <CButton onClick={() => onMakeAdmin(item.id)} color="warning" size="sm" className="ml-1">
                    Make admin
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          }
      }}
    />
  )
}

export default UsersTable;