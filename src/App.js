import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Funfics from "./components/Funfics";
import FunficForm from "./components/FunficForm";
import FunficRenderer from "./components/FunficRenderer";
import BaseNavBar from "./components/BaseNavBar";

function App() {
  return (
    <Router>
      <BaseNavBar/>
      <Switch>
        <Route path={"/editor"}>
          <FunficForm/>
        </Route>
        <Route path={"/read/:id"}>
          <FunficRenderer/>
        </Route>
        <Route path={"/"} component={Funfics}/>
      </Switch>
    </Router>
  );
}

export default App;