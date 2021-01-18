import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from './components/HomePage';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

  return (
    <div className="container">
      <Router>
        <Switch>
        <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/app" exact>
            <HomePage/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
