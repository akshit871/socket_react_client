import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Homepage from "../homepage/homepage";
import { connect } from "react-redux";
import styles from "./login.module.css";
import { Button, Paper, TextField } from "@material-ui/core";

function Login() {
  const [lg, setlg] = useState(false);
  const handleSignIn = () => {
    setlg(true);
  };
  if (lg) {
    console.log({ redirect: true }, "going...");
    return <Redirect to="/rico_homePage" />;
  }
  return (
    <Router>
      <div className={styles.parent}>
        <div className={styles.login_form}>
          <h1>LOGIN</h1>
          <TextField
            id="outlined-basic89"
            label="USERNAME"
            variant="outlined"
          />
          <TextField
            id="outlined-basic90"
            type="password"
            label="PASSWORD"
            variant="outlined"
          />
          <Button variant="outlined" color="primary" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
        <Switch>
          <Route path="/rico_homePage">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  bush: state.bushRd.bush,
});
const mapDispatchToProps = (dispatch) => {
  return {
    bushDone: (data) => dispatch({ type: "BUSH_D", payload: data }),
    fillStore: (data) => dispatch({ type: "UPDATE_STORE", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
