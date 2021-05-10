import React, { useContext } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import useWebSocketComments from "../../hooks/webSocketComments.hook";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";

/**
 * Component for rendering funfic comments and posting a personal comment
 * @param funficId - the id of the funfic which is used to fetch comments.
 * @param freeze - whether the component should be frozen(non-interactive)
 * @returns {JSX.Element}
 * @constructor
 */
function FunficComments({ funficId, freeze }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const auth = useContext(AuthContext);
  const { comments, errors, post } = useWebSocketComments(funficId);
  const commentContent = watch("commentContent", "");

  function onPostComment(commentContent) {
    post(commentContent);
    reset();
  }

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Comments</Card.Header>
        <ListGroup variant="flush">
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form
          onSubmit={handleSubmit(({ commentContent }) =>
            onPostComment(commentContent)
          )}
        >
          <Form.Group controlId="commentContent">
            <Form.Label>Enter your comment</Form.Label>
            <Form.Control
              disabled={!auth.isAuthenticated || freeze}
              defaultValue=""
              name="commentContent"
              ref={register}
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <Button
            disabled={!auth.isAuthenticated || freeze || !commentContent.length}
            variant="primary"
            type="submit"
          >
            Save comment
          </Button>
          <Form.Group>
            {errors.length ? <ErrorAlert errorMessage={errors} /> : ""}
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}

export default FunficComments;
