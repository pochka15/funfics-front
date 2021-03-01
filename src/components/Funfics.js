import React from "react";
import {useHistory} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const FUNFICS_URL = new URL('/funfics', process.env.REACT_APP_API_URL);

async function funficsResponseJson() {
  const response = await fetch(FUNFICS_URL.toString())
  if (response.ok) {
    return await response.json()
  } else {
    return null
  }
}

export default function Funfics() {
  const [funfics, setFunfics] = React.useState([])
  const [loadingFunfics, setLoadingFunfics] = React.useState(true)
  const history = useHistory();

  React.useEffect(() => {
    funficsResponseJson()
      .then(value => {
        setFunfics(value)
        setLoadingFunfics(false)
      })
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

  return (
    <div className="App">
      <header className="App-header">
        {loadingFunfics ? spinner : mappedFunfics}
      </header>
    </div>
  )
}