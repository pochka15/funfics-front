import React, {useMemo, useState} from 'react';
import FunficEditor from "./FunficEditor";
import {save} from "../../api/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";
import {Container} from "react-bootstrap";
import SuccessAlert from "../bootstrapWrappers/SuccessAlert";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";

const SUCCESS_MESSAGE_TYPE = "success";
const ERROR_MESSAGE_TYPE = "error";


function CreateNewFunfic() {
  const auth = React.useContext(AuthContext)
  const [message, setMessage] = useState(undefined);

  const unauthenticatedMessage = useMemo(
    () => auth.isAuthenticated ? undefined : "Please, sign in",
    [auth]
  )

  function refreshMessage() {
    setMessage(null);
  }

  function setSuccessMessage(content) {
    setMessage({content, type: SUCCESS_MESSAGE_TYPE});
  }

  function setErrorMessage(content) {
    setMessage({content, type: ERROR_MESSAGE_TYPE});
  }

  function onSave(funficData) {
    if (auth.isAuthenticated) {
      save(funficData,
        auth.token,
        () => setSuccessMessage("Funfic '" + funficData.name + "' is stored successfully"),
        () => setErrorMessage("Something went wrong :("));
    } else {
      setErrorMessage('Unauthenticated');
    }
  }

  return (
    <Container>
      {message && message.type === SUCCESS_MESSAGE_TYPE && <SuccessAlert successMessage={message.content}/>}
      {message && message.type === ERROR_MESSAGE_TYPE && <ErrorAlert errorMessage={message.content}/>}
      {unauthenticatedMessage && <ErrorAlert errorMessage={unauthenticatedMessage}/>}
      <FunficEditor onFormChanged={refreshMessage} onSaveFunfic={onSave}/>
    </Container>
  );
}

export default CreateNewFunfic;