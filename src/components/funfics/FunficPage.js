import React, {useContext, useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import {useHistory, useParams} from "react-router-dom";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {fetchFunficById} from "../../api/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import FunficComments from "./FunficComments";
import FunficRating from "./FunficRating";

/**
 * Parent component for viewing, commenting, ... funfic data
 * @returns {JSX.Element}
 * @constructor
 */
function FunficPage() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState();
  const [funfic, setFunfic] = useState(undefined);
  const [curUserIsAuthor, setCurUserIsAuthor] = useState(false);
  const [freezeCommentsComponent, setFreezeCommentsComponent] = useState(true);
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (funfic) {
      setCurUserIsAuthor(
        auth.isAuthenticated && funfic.author === jwt_decode(auth.token).sub
      );
    }
  }, [auth, funfic]);

  useEffect(() => {
    fetchFunficById(id)
      .then(setFunfic)
      .catch(() =>
        setErrorMessage("Couldn't fetch a funfic with the id: " + id)
      );
  }, [id]);

  useEffect(() => setFreezeCommentsComponent(!!errorMessage), [errorMessage]);

  const renderedContentOrSpinner = (funfic && (
    <MarkdownRenderer markdownContent={funfic.content} />
  )) || <CustomSpinner />;

  return (
    <Container>
      <Row>
        <Col>
          <FunficRating id={id} />
          <Button
            disabled={!(funfic && curUserIsAuthor)}
            onClick={() => history.push(`/edit-funfic/${id}`)}
          >
            Edit funfic
          </Button>
          <div style={{ paddingTop: 20 }}>
            <FunficComments freeze={freezeCommentsComponent} funficId={id} />
          </div>
        </Col>
        <Col>
          {errorMessage ? (
            <ErrorAlert errorMessage={errorMessage} />
          ) : (
            renderedContentOrSpinner
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FunficPage;
