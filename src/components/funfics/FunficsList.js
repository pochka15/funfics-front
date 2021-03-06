import React from "react";
import {useHistory} from "react-router-dom";
import {Spinner, Table} from "react-bootstrap";
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import {fetchFunficsWithoutContent} from "../../utils/funficsApi";


export default function FunficsList() {
  const [funfics, setFunfics] = React.useState([]);
  const [loadingFunfics, setLoadingFunfics] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const history = useHistory();
  React.useEffect(() => {
    fetchFunficsWithoutContent(jsonData => {
      setFunfics(jsonData)
      setLoadingFunfics(false)
    }, error => setErrorMessage("Couldn't fetch messages, error: " + error))
  }, [])

  const readFunfic = id => history.push(`/read/${id}`)

  const spinner = (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading funfics...</span>
    </Spinner>
  )

  function funficsTable(funfics) {
    return (
      <Table variant="dark" striped bordered hover>
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
        {funfics.map(f => (
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
    )
  }

  const funficsRepresentation = (
    funfics.length ? funficsTable(funfics) : "There are no funfics in the database"
  )

  const loadedFunfics = loadingFunfics ? spinner : funficsRepresentation;

  return (
    <div className="App">
      <header className="App-header">
        {errorMessage
          ? <ErrorAlert errorMessage={errorMessage}/>
          : loadedFunfics}
      </header>
    </div>
  )
}