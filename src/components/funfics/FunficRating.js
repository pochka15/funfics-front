import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import {
  checkIfCanRateFunfic,
  getFunficRating,
  rateFunfic,
} from "../../api/funficsApi";

function FunficRating() {
  const [canRate, setCanRate] = useState(false);
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(undefined);

  function onSendRating(data) {
    rateFunfic(id, data.rating, auth.token)
      .then(() => setCanRate(false))
      .catch((error) =>
        console.log(`Error while sending rating the funfic: ${error.message}`)
      );
  }

  useEffect(() => {
    getFunficRating(id)
      .then((rating) => setRating(rating))
      .catch((error) =>
        console.log(`Error while getting the average rating: ${error.message}`)
      );
  }, [id]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      checkIfCanRateFunfic(id, auth.token)
        .then((canRate) => setCanRate(canRate))
        .catch((error) =>
          console.log(
            `Error while checking if can rate the funfic: ${error.message}`
          )
        );
    }
  }, [auth, id]);

  return (
    <Form onSubmit={handleSubmit(onSendRating)}>
      <Form.Group>
        {rating !== undefined && (
          <div>
            <b>Funfic rating is: </b> {rating}
          </div>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Control as="select" name="rating" ref={register}>
          {Array.from(Array(5).keys(), (chosenRating, ind) => (
            <option key={ind} value={chosenRating + 1}>
              {chosenRating + 1}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Button disabled={!canRate} variant="primary" type="submit">
          Rate
        </Button>
      </Form.Group>
    </Form>
  );
}

export default FunficRating;