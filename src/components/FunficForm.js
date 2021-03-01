import React, {useRef, useState} from 'react'
import {Button, Container, Form} from "react-bootstrap";
import MarkdownEditor from "./MarkdownEditor";
import {useForm} from "react-hook-form";
import {send} from "../utils/communicationWithServer"
import SuccessAlert from "./bootstrapWrappers/SuccessAlert";
import ErrorAlert from "./bootstrapWrappers/ErrorAlert";

export default function FunficForm() {
  const {register, handleSubmit} = useForm();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const refreshMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }
  const content = useRef("**Hello world!**");
  const onSubmit = funficData => {
    funficData = {
      ...funficData,
      tags: funficData.tags.split(" "),
      content: content.current
    }
    send(funficData,
      () => setSuccessMessage("Funfic '" + funficData.name + "' is stored successfully"),
      () => setErrorMessage("Something went wrong :("));
  }

  return (
    <Container>
      <Form onChange={refreshMessages} onSubmit={handleSubmit(onSubmit)}>
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