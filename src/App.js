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
        <Switch>
          <Route path="/rico_homePage">
            <Homepage />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
