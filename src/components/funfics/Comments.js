import React, { useContext } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * Component for rendering funfic comments and posting a personal comment
 * @param comments
 * @param onSubmitComment
 * @returns {JSX.Element}
 * @constructor
 */
function Comments({ comments, onSubmitComment }) {
  const { register, handleSubmit } = useForm();
  const auth = useContext(AuthContext);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Comments</Card.Header>
        <ListGroup variant="flush">
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={handleSubmit(onSubmitComment)}>
          <Form.Group controlId="commentContent">
            <Form.Label>Enter your comment</Form.Label>
            <Form.Control
              name="commentContent"
              ref={register}
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <Button
            disabled={!auth.isAuthenticated}
            variant="primary"
            type="submit"
          >
            Save comment
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Comments;
