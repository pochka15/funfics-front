import React, { useCallback, useContext, useEffect, useState } from "react";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import { Button, Form } from "react-bootstrap";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import FunficsTableWithCheckboxes from "./FunficsTableWithSelections";
import { deleteUserFunfics, fetchUserFunfics } from "../../api/funficsApi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

function UserFunfics() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [funfics, setFunfics] = useState(undefined);
  // It's a hack. Haven't found a better solution to keep checkboxes in a consistent state after deleting table rows
  const [tableKeyToRemount, setTableKeyToRemount] = useState(0);
  const [selectedIdsToFunfics, setSelectedIdsToFunfics] = useState(new Map());
  const { isAuthenticated, token } = React.useContext(AuthContext);
  const { handleSubmit } = useForm();
  const auth = useContext(AuthContext);

  useEffect(() => {
    function fetchFunfics() {
      fetchUserFunfics(token)
        .then(setFunfics)
        .catch((error) => setErrorMessage(error.message));
    }

    isAuthenticated ? fetchFunfics() : setErrorMessage("Please, sign in");
  }, [isAuthenticated, token]);

  function deleteSelectedFunfics() {
    deleteUserFunfics(auth.token, Array.from(selectedIdsToFunfics.keys()))
      .then(() => {
        setFunfics(notSelectedFunfics);
        setTableKeyToRemount(tableKeyToRemount ? 0 : 1);
      })
      .catch((error) => setErrorMessage(error.message));
  }

  function notSelectedFunfics() {
    return funfics.filter((f) => selectedIdsToFunfics.get(f.id) === undefined);
  }

  const updateIdToFunficsMap = useCallback(
    (selectedFunficIds) => {
      const map = new Map();
      funfics
        .filter((funfic) => selectedFunficIds[funfic.id] !== undefined)
        .forEach((funfic) => map.set(funfic.id, funfic));
      setSelectedIdsToFunfics(map);
    },
    [funfics]
  );

  const spinnerOrTable =
    funfics === undefined ? (
      <CustomSpinner />
    ) : (
      <FunficsTableWithCheckboxes
        key={tableKeyToRemount}
        onSelectionsChanged={updateIdToFunficsMap}
        funfics={funfics}
      />
    );

  return (
    <div>
      <div className="Centered">
        {errorMessage ? (
          <ErrorAlert errorMessage={errorMessage} />
        ) : (
          spinnerOrTable
        )}
      </div>
      <Form onSubmit={handleSubmit(deleteSelectedFunfics)}>
        <Button
          disabled={!funfics || !selectedIdsToFunfics.size}
          variant="primary"
          type="submit"
        >
          Delete
        </Button>
      </Form>
    </div>
  );
}

export default UserFunfics;
