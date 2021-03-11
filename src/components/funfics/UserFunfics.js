import React, {useCallback, useContext, useEffect, useState} from 'react';
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {Button, Form} from "react-bootstrap";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import FunficsTableWithCheckboxes from "./FunficsTableWithSelections";
import {deleteUserFunfics, fetchUserFunfics} from "../../api/funficsApi";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../contexts/AuthContext";

function UserFunfics() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [funfics, setFunfics] = useState(undefined)
  const [selectedIdsToFunfics, setSelectedIdsToFunfics] = useState(new Map())
  const {isAuthenticated, token} = React.useContext(AuthContext)
  const {handleSubmit} = useForm();
  const auth = useContext(AuthContext)

  useEffect(() => {
    function fetchFunfics() {
      fetchUserFunfics(token,
        jsonData => {
          setFunfics(jsonData);
          setErrorMessage(undefined);
        },
        error => setErrorMessage("Couldn't fetch messages, error: " + error));
    }

    isAuthenticated ? fetchFunfics() : setErrorMessage("Please, sign in")
  }, [isAuthenticated, token])

  function deleteSelectedFunfics() {
    deleteUserFunfics(
      auth.token,
      Array.from(selectedIdsToFunfics.keys()),
      () => setFunfics(notSelectedFunfics),
      error => console.log(error.message))
  }

  function notSelectedFunfics() {
    return funfics.filter(f => selectedIdsToFunfics.get(f.id) === undefined)
  }

  const updateIdToFunficsMap = useCallback(selectedFunficIds => {
    const map = new Map();
    funfics.filter(funfic => selectedFunficIds[funfic.id] !== undefined)
      .forEach(funfic => map.set(funfic.id, funfic))
    setSelectedIdsToFunfics(map)
  }, [funfics])


  const spinnerOrTable = (
    funfics === undefined
      ? <CustomSpinner/>
      : <FunficsTableWithCheckboxes onSelectionsChanged={updateIdToFunficsMap} funfics={funfics}/>
  )

  return (
    <div>
      <div className="Centered">
        {errorMessage
          ? <ErrorAlert errorMessage={errorMessage}/>
          : spinnerOrTable}
      </div>
      <Form onSubmit={handleSubmit(deleteSelectedFunfics)}>
        <Button disabled={!funfics || !selectedIdsToFunfics.size} variant="primary" type="submit">
          Delete
        </Button>
      </Form>
    </div>
  );
}

export default UserFunfics;