import React, {useMemo, useRef, useState} from 'react'
import {Button, Container, Form} from "react-bootstrap";
import MarkdownEditor from "../markdown/MarkdownEditor";
import {useForm} from "react-hook-form";
import SuccessAlert from "../bootstrapWrappers/SuccessAlert";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {save} from "../../api/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";

const SUCCESS_MESSAGE_TYPE = "success";
const ERROR_MESSAGE_TYPE = "error";

export default function FunficForm() {
  const [message, setMessage] = useState(undefined);
  const {register, handleSubmit} = useForm();
  const content = useRef("**Hello world!**");
  const auth = React.useContext(AuthContext)
  const unauthenticatedMessage = useMemo(
    () => auth.isAuthenticated ? undefined : "Please, sign in",
    [auth.isAuthenticated]
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
      <Form onChange={refreshMessage} onSubmit={handleSubmit(onSubmit)}>
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
        {message && message.type === SUCCESS_MESSAGE_TYPE && <SuccessAlert successMessage={message.content}/>}
        {message && message.type === ERROR_MESSAGE_TYPE && <ErrorAlert errorMessage={message.content}/>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}