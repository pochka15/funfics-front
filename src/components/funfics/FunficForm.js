import React, {useMemo, useRef, useState} from 'react'
import {Button, Container, Form} from "react-bootstrap";
import MarkdownEditor from "../markdown/MarkdownEditor";
import {useForm} from "react-hook-form";
import SuccessAlert from "../bootstrapWrappers/SuccessAlert";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {save} from "../../utils/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";

export default function FunficForm() {
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const {register, handleSubmit} = useForm();
  const content = useRef("**Hello world!**");
  const auth = React.useContext(AuthContext)
  const unauthenticatedMessage = useMemo(
    () => auth.isAuthenticated ? undefined : "Please, sign in",
    [auth.isAuthenticated])

  function refreshMessages() {
    setSuccessMessage(null);
    setErrorMessage(null);
  }

  function onSubmit(funficData) {
    if (auth.isAuthenticated) {
      save(prepareForSaving(funficData),
        auth.token,
        () => setSuccessMessage("Funfic '" + funficData.name + "' is stored successfully"),
        () => setErrorMessage("Something went wrong :("));
    } else {
      setErrorMessage('Unauthenticated');
    }
  }

  function prepareForSaving(funficData) {
    return {
      ...funficData,
      tags: funficData.tags.split(" "),
      content: content.current
    }
  }

  return (
    <Container>
      <Form onChange={refreshMessages} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          {unauthenticatedMessage && <ErrorAlert errorMessage={unauthenticatedMessage}/>}
        </Form.Group>
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control name="genre" ref={register} as="input">
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control name="tags" ref={register} as="input">
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Funfic name</Form.Label>
          <Form.Control name="name" ref={register} as="input">
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" ref={register} as="textarea" rows={3}/>
        </Form.Group>
        <Form.Group>
          <MarkdownEditor onContentUpdated={newContent => content.current = newContent}/>
        </Form.Group>
        {successMessage && <SuccessAlert successMessage={successMessage}/>}
        {errorMessage && <ErrorAlert errorMessage={errorMessage}/>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}