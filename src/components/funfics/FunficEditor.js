import React from 'react'
import {Button, Container, Form} from "react-bootstrap";
import MarkdownEditor from "../markdown/MarkdownEditor";
import {useForm} from "react-hook-form";

const emptyDefaultFunficData = {
  name: "",
  description: "",
  genre: "",
  tags: "",
  content: "",
}

export default function FunficEditor({defaultFunficData, onSaveFunfic, onFormChanged}) {
  defaultFunficData = defaultFunficData || emptyDefaultFunficData

  const {register, handleSubmit} = useForm({
    defaultValues: defaultFunficData
  });
  const [content, setContent] = React.useState(defaultFunficData.content);

  function onSubmit(funficData) {
    onSaveFunfic(withTagsAsArray(withContent(funficData)));
  }

  function withContent(data) {
    data.content = content;
    return data;
  }

  function withTagsAsArray(data) {
    data.tags = data.tags.split(" ");
    return data;
  }

  return (
    <Container>
      <Form onChange={onFormChanged} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control name="genre" ref={register} as="input">
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            name="tags"
            ref={register}
            as="input">
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
          <MarkdownEditor content={content} setContent={setContent}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}