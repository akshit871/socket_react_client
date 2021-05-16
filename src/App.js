import React, { useState, useEffect } from "react";
import { dateGet } from "./utility/helper";
import socketIOClient from "socket.io-client";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Admin from "./components/adminf/admin";

function App() {
  return (
    <Router>
      <div>
        <Login />
        <Switch>
          <Route path="/rico_homePage">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
