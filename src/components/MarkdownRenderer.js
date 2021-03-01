import React from 'react'
import {Container} from "react-bootstrap";
import MarkdownView from 'react-showdown';

const showdownOptions = {
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
};

export default function MarkdownRenderer({markdownContent}) {
  return (
    <Container>
      <MarkdownView
        markdown={markdownContent}
        options={showdownOptions}
      />
    </Container>
  );
}