import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { dateGet, getCurTime } from "../../utility/helper";
import styles from "./login.module.css";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router";
const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  txt: {
    height: "70px",
  },
}));

const LoginInfo = ({ user, model }) => {
  const classes = useStyles();
  const [redirect, setredirect] = useState(false);

  if (redirect) {
    console.log({ redirect: true }, "going...");
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.grandP}>
      <div className={styles.flex_row}>
        <Button
          size="large"
          className={classes.margin}
          variant="outlined"
          color="secondary"
        >
          RESET
        </Button>
        <Button
          size="large"
          className={classes.margin}
          variant="outlined"
          color="secondary"
          onClick={() => {
            setredirect(true);
          }}
        >
          LOGOUT
        </Button>
      </div>
      <div className={styles.model}>
        <TextField
          id="outlined-basic12149"
          label="Model"
          size="small"
          variant="outlined"
          autoComplete="off"
          InputProps={{
            readOnly: true,
          }}
          value={model}
          fullWidth
          inputProps={{ style: { fontSize: 30, fontWeight: 600 } }} // font size of input text.
          // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
          className={classes.txt}
        />
      </div>
      <div className={styles.lCard}>
        <label>LOGIN INFO</label>
        <TextField
          id="outlined-basic1214"
          label="Name"
          variant="outlined"
          autoComplete="off"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={user}
          fullWidth
          inputProps={{ style: { fontSize: 30, fontWeight: 600 } }} // font size of input text.
          // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
          className={`laser`}
        />
        <TextField
          id="outlined-basic1215"
          label="Time"
          variant="outlined"
          autoComplete="off"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={getCurTime()}
          fullWidth
          inputProps={{ style: { fontSize: 30, fontWeight: 600 } }} // font size of input text.
          // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
          className={`laser`}
        />
        <TextField
          id="outlined-basic1216"
          label="Date"
          variant="outlined"
          autoComplete="off"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={dateGet()}
          fullWidth
          inputProps={{ style: { fontSize: 30, fontWeight: 600 } }} // font size of input text.
          // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
          className={`laser`}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bush: state.bushRd.bush,
  user: state.loginRd.user,
  model: state.loginRd.model,
});

const mapDispatchToProps = (dispatch) => {
  return {
    bushDone: (data) => dispatch({ type: "BUSH_D" }, data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginInfo);
