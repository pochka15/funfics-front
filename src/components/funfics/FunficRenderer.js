import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import MarkdownRenderer from "../markdown/MarkdownRenderer";
import {useParams} from "react-router-dom";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {fetchFunficById} from "../../utils/funficsApi";

function FunficRenderer() {
  const {id} = useParams();
  const [markdownContent, setMarkdownContent] = useState('Loading content');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    fetchFunficById(id,
      data => setMarkdownContent(data.content),
      () => setErrorMessage("Couldn't fetch a funfic with the id: " + id));
  });

  return (
    <Container>
      {errorMessage
        ? <ErrorAlert errorMessage={errorMessage}/>
        : <MarkdownRenderer markdownContent={markdownContent}/>}
    </Container>
  );
}

export default FunficRenderer;