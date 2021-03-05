import React from "react";
import {useHistory} from "react-router-dom";
import {Spinner} from "react-bootstrap";
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

  const mappedFunfics = (
    funfics.length
      ? funfics.map(f => <p onClick={() => readFunfic(f.id)} key={f.id}>{`${f.id}: ${f.name}`}</p>)
      : "There are no funfics in the database"
  )

  const loadedFunfics = loadingFunfics ? spinner : mappedFunfics;

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