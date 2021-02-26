import React from "react";

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
  React.useEffect(() => {
    setTimeout(async () => {
      console.log("Waiting")
      const got = await funficsResponseText()
      if (got) {
        console.log("Setting")
        setFunfics(got)
      }
    }, 1000)
  }, [])

  return (
    <div>
      <p>{FUNFICS_URL.toString()}</p>
      {funfics.length
        ? funfics.map((f, ind) => <p key={ind}>{f.name}</p>)
        : "No funfics yet"
      }
    </div>
  )
}