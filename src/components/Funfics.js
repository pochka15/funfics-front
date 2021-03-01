import React from "react";
import logo from "../logo.svg";
import {useHistory} from "react-router-dom";

const FUNFICS_URL = new URL('/funfics', process.env.REACT_APP_API_URL);

async function funficsResponseText() {
  const response = await fetch(FUNFICS_URL.toString())
  if (response.ok) {
    return await response.json()
  } else {
    return null
  }
}

export default function Funfics() {
  const [funfics, setFunfics] = React.useState([])
  const history = useHistory();

  React.useEffect(() => {
    (async () => {
      const got = await funficsResponseText()
      if (got) {
        setFunfics(got)
      }
    })()
  }, [])

  const readFunfic = id => history.push(`/read/${id}`)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        {funfics.length
          ? funfics.map((f, ind) => <p onClick={() => readFunfic(f.id)} key={f.id}>{`${f.id}: ${f.name}`}</p>)
          : "No funfics yet"
        }
      </header>
    </div>
  )
}