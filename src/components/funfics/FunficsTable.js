import React from "react";
import {useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";

export default function FunficsTable({funfics}) {
  const history = useHistory();

  const readFunfic = id => history.push(`/read/${id}`)

  return (
    <div>
      <Table variant="light" striped bordered hover>
        <thead>
        <tr>
          <th>Author</th>
          <th>Genre</th>
          <th>Tags</th>
          <th>Name</th>
          <th>Description</th>
          <th>Rating</th>
        </tr>
        </thead>
        <tbody>
        {funfics && funfics.map(f => (
          <tr key={f.id} onClick={() => readFunfic(f.id)}>
            <td>{f.author}</td>
            <td>{f.genre}</td>
            <td>{f.tags.join(", ")}</td>
            <td>{f.name}</td>
            <td>{f.description}</td>
            <td>{f.rating}</td>
          </tr>
        ))
        }
        </tbody>
      </Table>
    </div>
  )
}