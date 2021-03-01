import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import MarkdownRenderer from "./MarkdownRenderer";
import {fetchFunficById} from "../utils/communicationWithServer"
import {useParams} from "react-router-dom";

function FunficRenderer() {
  const {id} = useParams();
  const [markdownContent, setMarkdownContent] = useState('Loading content')

  useEffect(() => {
    fetchFunficById(id).then(data => setMarkdownContent(data.content));
  });

  return (
    <Container>
      <MarkdownRenderer markdownContent={markdownContent}/>
    </Container>
  );
}

export default FunficRenderer;