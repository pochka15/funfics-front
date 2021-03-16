import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import FunficPage from "./components/funfics/FunficPage";
import BaseNavBar from "./components/BaseNavBar";
import {AuthContext} from "./contexts/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import Login from "./components/userActivity/Login";
import Register from "./components/userActivity/Register";
import ShortcutsListener from "./components/ShortcutsListener";
import UserAccount from "./components/UserAccount";
import AllFunfics from "./components/funfics/AllFunfics";
import Admin from "./components/admin/Admin";
import UserSettings from "./components/admin/UserSettings";
import EditFunfic from "./components/funfics/EditFunfic";
import CreateNewFunfic from "./components/funfics/CreateNewFunfic";

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
            <CreateNewFunfic/>
          </Route>
          <Route path={"/edit-funfic/:id"}>
            <EditFunfic/>
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
            <FunficPage/>
          </Route>
          <Route path={"/admin/user-settings/:id"} component={UserSettings}/>
          <Route path={"/admin"} component={Admin}/>
          <Route path={"/"} component={AllFunfics}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;