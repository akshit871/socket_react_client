import React, { useEffect, useState } from "react";
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
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 3,
    color: "#fff",
  },
}));

function Login({ hid = "", fillStore = () => {}, fillHid = () => {} }) {
  const classes = useStyles();
  const [open, setopen] = useState(false);

  const [lg, setlg] = useState(false);
  const [model, setmodel] = useState("");
  const [u, setu] = useState("");
  const [p, setp] = useState("");

  const handleChange = (e) => {
    console.log({ o: e.target });
    let v = e.target.value;
    setmodel(v);
    setopen(true);
    const socket = socketIOClient(ENDPOINT);
    socket.emit("model_selection", {
      model: v,
    });
    socket.on("model_done", (data) => {
      console.log({ data });
      setopen(false);
      socket.disconnect();
    });
  };

  const handleSignIn = () => {
    fillStore({ user: u, model: model });
    setlg(true);
  };

  if (lg) {
    console.log({ redirect: true }, "going...");
    return <Redirect to="/rico_homePage" />;
  }

  return (
    <div className={styles.parent}>
      <div className={styles.login_form}>
        <h1>LOGIN</h1>
        <TextField
          value={u}
          id="outlined-basic89"
          label="USERNAME"
          variant="outlined"
          onChange={(e) => {
            setu(e.target.value);
          }}
        />
        <TextField
          value={p}
          id="outlined-basic90"
          type="password"
          label="PASSWORD"
          variant="outlined"
          onChange={(e) => {
            setp(e.target.value);
          }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            M/C Model
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={model}
            onChange={handleChange}
            label="Select Machine Model"
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={`model1`}>Model1</MenuItem>
            <MenuItem value={"model2"}>Model2</MenuItem>
            <MenuItem value={"model3"}>Model3</MenuItem>
            <MenuItem value={"model4"}>Model4</MenuItem>
            <MenuItem value={"model5"}>Model5</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
      {
        <Backdrop className={classes.backdrop} open={open} onClick={() => {}}>
          <CircularProgress color="primary" />
        </Backdrop>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  bush: state.bushRd.bush,
  hid: state.hwRd.id,
});
const mapDispatchToProps = (dispatch) => {
  return {
    bushDone: (data) => dispatch({ type: "BUSH_D", payload: data }),
    fillStore: (data) => dispatch({ type: "LOGIN", payload: data }),
    fillHid: (data) => dispatch({ type: "HID", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
