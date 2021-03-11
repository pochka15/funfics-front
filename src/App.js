import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import FunficForm from "./components/funfics/FunficForm";
import FunficRenderer from "./components/funfics/FunficRenderer";
import BaseNavBar from "./components/BaseNavBar";
import {AuthContext} from "./contexts/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import Login from "./components/userActivity/Login";
import Register from "./components/userActivity/Register";
import ShortcutsListener from "./components/ShortcutsListener";
import UserAccount from "./components/UserAccount";
import AllFunfics from "./components/funfics/AllFunfics";

function App() {
  const {login, logout, token} = useAuth();

  return (
    <AuthContext.Provider value={{
      login, logout, token, isAuthenticated: !!token
    }}>
      <Router>
        <ShortcutsListener/>
        <BaseNavBar/>
        <Switch>
          <Route path={"/editor"}>
            <FunficForm/>
          </Route>
          <Route path={"/personal"}>
            <UserAccount/>
          </Route>
          <Route path={"/login"}>
            <Login/>
          </Route>
          <Route path={"/register"}>
            <Register/>
          </Route>
          <Route path={"/read/:id"}>
            <FunficRenderer/>
          </Route>
          <Route path={"/"} component={AllFunfics}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;