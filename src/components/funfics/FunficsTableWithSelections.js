import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import withSelections from "react-item-select";
import ReactDOM from "react-dom";

function FunficsTableWithSelections(props) {
  const {
    funfics,
    onSelectionsChanged,
    // props provided by the react-item-select:
    areAllIndeterminate,
    areAllSelected,
    handleSelect,
    handleSelectAll,
    isItemSelected,
    selections,
  } = props;

  const history = useHistory();
  const headerCheckboxRef = useRef();
  const readFunfic = (id) => history.push(`/read/${id}`);

  useEffect(() => {
    onSelectionsChanged(selections);
    ReactDOM.findDOMNode(
      headerCheckboxRef.current
    ).indeterminate = areAllIndeterminate(funfics);
  }, [funfics, areAllIndeterminate, selections, onSelectionsChanged]);

  return (
    <Table variant="light" striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              checked={areAllSelected(funfics)}
              ref={headerCheckboxRef}
              onChange={() => {
                handleSelectAll(funfics);
              }}
            />
          </th>
          <th>Author</th>
          <th>Genre</th>
          <th>Tags</th>
          <th>Name</th>
          <th>Description</th>
          <th>Rating</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {funfics &&
          funfics.map((f) => (
            <tr key={f.id}>
              <td>
                <Form.Check
                  checked={isItemSelected(f.id)}
                  onChange={() => {
                    handleSelect(f.id);
                  }}
                />
              </td>
              <td>{f.author}</td>
              <td>{f.genre}</td>
              <td>{f.tags.join(", ")}</td>
              <td>{f.name}</td>
              <td>{f.description}</td>
              <td>{f.rating}</td>
              <td>
                <Button onClick={() => readFunfic(f.id)}>Read</Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

FunficsTableWithSelections.propTypes = {
  funfics: PropTypes.array,
  onSelectionsChanged: PropTypes.func,
};
export default withSelections(FunficsTableWithSelections);
