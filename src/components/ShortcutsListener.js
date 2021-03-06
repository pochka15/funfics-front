import React from "react";
import {useHotkeys} from "react-hotkeys-hook";
import {useHistory} from "react-router-dom";

function EnableCustomHotkeys() {
  const history = useHistory()
  useHotkeys('ctrl+alt+h', () => history.push("/"));
  useHotkeys('ctrl+alt+l', () => history.push("/login"));
  useHotkeys('ctrl+alt+r', () => history.push("/register"));
  useHotkeys('ctrl+alt+e', () => history.push("/editor"));
  return (<div/>)
}

export default EnableCustomHotkeys;