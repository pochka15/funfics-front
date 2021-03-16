import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import {useHistory, useParams} from "react-router-dom";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {fetchFunficById} from "../../api/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";

function FunficPage() {
  const {id} = useParams();
  const [errorMessage, setErrorMessage] = useState();
  const [funfic, setFunfic] = useState(undefined)
  const [curUserIsAuthor, setCurUserIsAuthor] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory()

  useEffect(() => {
    fetchFunficById(id,
      funfic => setFunfic(funfic),
      () => setErrorMessage("Couldn't fetch a funfic with the id: " + id));
  }, [id]);

  useEffect(() => {
    if (funfic) {
      setCurUserIsAuthor(auth.isAuthenticated
        && (funfic.author === jwt_decode(auth.token).sub))
    }
  }, [auth, funfic])

  const renderedContentOrSpinner = (
    (funfic && <MarkdownRenderer markdownContent={funfic.content}/>)
    || <CustomSpinner/>)

  return (
    <Container>
      <Row>
        <Col>
          <Button disabled={(!(funfic && curUserIsAuthor))}
                  onClick={() => history.push(`/edit-funfic/${id}`)}
          >Edit funfic
          </Button>
        </Col>
        <Col>
          {errorMessage
            ? <ErrorAlert errorMessage={errorMessage}/>
            : renderedContentOrSpinner}
        </Col>
      </Row>
    </Container>
  );
}

export default FunficPage;