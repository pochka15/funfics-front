import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Funfics from "./components/Funfics";
import BootstrapSandbox from "./components/BootstrapSandbox";
import FunficForm from "./components/FunficForm";
import FunficRenderer from "./components/FunficRenderer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/editor"}>
          <FunficForm/>
        </Route>
        <Route path={"/read/:id"}>
          <FunficRenderer/>
        </Route>
        <Route path={"/sandbox"} component={BootstrapSandbox}/>
        <Route path={"/"} component={Funfics}/>
      </Switch>
    </Router>
  );
}

export default App;