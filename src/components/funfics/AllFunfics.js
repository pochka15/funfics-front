import React, {useState} from 'react';
import ErrorAlert from "../bootstrapWrappers/ErrorAlert";
import FunficsTable from "./FunficsTable";
import {fetchFunficsWithoutContent} from "../../api/funficsApi";
import CustomSpinner from "../bootstrapWrappers/CustomSpinner";


/**
 * Component that shows all the fetched funfics from the server.
 * @returns {JSX.Element}
 * @constructor
 */
function AllFunfics() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [funfics, setFunfics] = useState(undefined)
  React.useEffect(() => {
    fetchFunficsWithoutContent(jsonData => {
      setFunfics(jsonData)
    }, error => setErrorMessage("Couldn't fetch messages, error: " + error))
  }, [])

  const spinnerOrTable = (
    funfics === undefined
      ? <CustomSpinner/>
      : <FunficsTable funfics={funfics}/>
  )

  return (
    <div className="Centered">
      <header className="App-header">
        {errorMessage
          ? <ErrorAlert errorMessage={errorMessage}/>
          : spinnerOrTable}
      </header>
    </div>
  );
}

export default AllFunfics;