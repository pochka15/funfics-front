import React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "bootstrap/dist/css/bootstrap.min.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function MarkdownEditor({ content, setContent }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  return (
    <ReactMde
      value={content}
      onChange={(newContent) => {
        setContent(newContent);
      }}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  );
}
