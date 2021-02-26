import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route, Switch,
} from "react-router-dom";
import Funfics from "./components/Funfics";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <Router>
          <Switch>
            <Route path={"/"} component={Funfics}/>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
