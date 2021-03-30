import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import {
  checkIfCanRateFunfic,
  getAverageRating,
  rateFunfic,
} from "../../api/funficsApi";

function FunficRating() {
  const [canRate, setCanRate] = useState(false);
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [averageRating, setAverageRating] = useState(undefined);

  function onSendRating(data) {
    rateFunfic(
      id,
      data.rating,
      auth.token,
      () => {
        setCanRate(false);
      },
      (error) =>
        console.log(`Error while sending rating the funfic: ${error.message}`)
    );
  }

  useEffect(() => {
    getAverageRating(
      id,
      (rating) => setAverageRating(rating),
      (error) =>
        console.log(`Error while getting the average rating: ${error.message}`)
    );
  }, [id]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      checkIfCanRateFunfic(
        id,
        auth.token,
        (canRate) => setCanRate(canRate),
        (error) =>
          console.log(
            `Error while checking if can rate the funfic: ${error.message}`
          )
      );
    }
  }, [auth, id]);

  return (
    <Form onSubmit={handleSubmit(onSendRating)}>
      <Form.Group>
        {averageRating !== undefined && (
          <div>
            <b>Funfic rating is: </b> {averageRating}
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