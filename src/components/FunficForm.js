import React, {useRef} from 'react'
import {Button, Container, Form} from "react-bootstrap";
import MarkdownEditor from "./MarkdownEditor";
import {useForm} from "react-hook-form";
import {send} from "../utils/communicationWithServer"

export default function FunficForm() {
  const {register, handleSubmit} = useForm();
  const content = useRef("**Hello world!**");
  const onSubmit = funficData => {
    funficData = {
      ...funficData,
      tags: funficData.tags.split(" "),
      content: content.current
    }
    //TODO(@pochka15): here when I do send I must get the result and check for errors
    send(funficData)
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}