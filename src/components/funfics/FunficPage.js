import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import {useHistory, useParams} from "react-router-dom";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {fetchFunficById, fetchFunficComments} from "../../api/funficsApi";
import {AuthContext} from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";
import Comments from "./Comments";
import {configuredStompClient} from "../../utils/stompClient";
import ApiUrls from "../../apiUrls";

function FunficPage() {
  const {id} = useParams();
  const [errorMessage, setErrorMessage] = useState();
  const [funfic, setFunfic] = useState(undefined);
  const [funficComments, setFunficComments] = useState([]);
  const [curUserIsAuthor, setCurUserIsAuthor] = useState();
  const [sockClient, setSockClient] = useState(undefined);
  const auth = useContext(AuthContext);
  const history = useHistory()

  useEffect(() => {
    fetchFunficById(id,
      funfic => setFunfic(funfic),
      () => setErrorMessage("Couldn't fetch a funfic with the id: " + id));
  }, [id]);

  useEffect(() => {
    fetchFunficComments(id,
      comments => setFunficComments(comments),
      error => console.log("Fetch comments: " + error))
  }, [id])

  useEffect(() => {
    if (funfic) {
      setCurUserIsAuthor(auth.isAuthenticated
        && (funfic.author === jwt_decode(auth.token).sub))
    }
  }, [auth, funfic])

  useEffect(() => {
    const client = configuredStompClient(ApiUrls.WEBSOCKET_ENDPOINT)

    client.connect({}, () => {
      client.subscribe('/sock/comment-listeners', (message) => {
        setFunficComments(prev => [...prev, JSON.parse(message.body)])
      });
      setSockClient(client)
    })
  }, [])

  const renderedContentOrSpinner = (
    (funfic && <MarkdownRenderer markdownContent={funfic.content}/>)
    || <CustomSpinner/>)

  function sendComment(data) {
    if (auth.isAuthenticated && sockClient) {
      sockClient.send("/sock/save-comment",
        {'Authorization': `Bearer ${auth.token}`},
        JSON.stringify({
          content: data.commentContent,
          funficId: id
        }));
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button disabled={(!(funfic && curUserIsAuthor))}
                  onClick={() => history.push(`/edit-funfic/${id}`)}
          >Edit funfic
          </Button>
          <div style={{paddingTop: 20}}>
            <Comments onSubmitComment={sendComment} comments={funficComments}/>
          </div>
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