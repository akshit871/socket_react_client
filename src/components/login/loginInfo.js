import { Button, makeStyles, TextField, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { dateGet, getCurTime } from "../../utility/helper";
import styles from "./login.module.css";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router";
const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles(
  (theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    txt: {
      height: "70px",
    },
  }),
  { index: 1 }
);

const StyledTextField = withStyles((theme) => ({
  root: {
    width: 140,
    fontSize: "1rem",
    backgroundColor: "black",
    borderRadius: "10px",
    "& .MuiInputBase-root": {
      color: "#aaf542",
      height: 30,
      "& input": {
        textAlign: "center",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
    },
  },
}))(TextField);

const StyledTextField2 = withStyles((theme) => ({
  root: {
    width: 158,
    fontSize: "1rem",
    borderRadius: "10px",
    "& .MuiInputBase-root": {
      color: "#aaf542",
      height: 30,
      "& input": {
        textAlign: "center",
      },
    },
    "& .MuiFormLabel-root": {
      fontWeight: 900,
      textAlign: "center",
      padding: 0,
      fontSize: "15px",
    },
  },
}))(TextField);

const LoginInfo = ({ user, model }) => {
  const classes = useStyles();
  const [redirect, setredirect] = useState(false);
  const [time, settime] = useState(() => getCurTime());

  useEffect(() => {
    let id = setInterval(() => {
      settime(getCurTime());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  if (redirect) {
    console.log({ redirect: true }, "going...");
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.grandP}>
      <div className={styles.flex_row}>
        <Button
          size="small"
          className={classes.margin}
          variant="outlined"
          color="secondary"
        >
          RESET
        </Button>
        <Button
          size="small"
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
        <StyledTextField2
          id="outlined-basic12149"
          label="MODEL"
          size="small"
          variant="outlined"
          autoComplete="off"
          InputProps={{
            readOnly: true,
          }}
          value={model}
          fullWidth
          inputProps={{ style: { fontSize: 17, fontWeight: 800 } }} // font size of input text.
          InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label.
        />
      </div>
      <div className={styles.lCard}>
        <label>LOGIN INFO</label>
        <StyledTextField
          id="outlined-basic1214"
          // label="NAME"
          placeholder="NAME"
          variant="outlined"
          autoComplete="off"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={user}
          fullWidth
          inputProps={{ style: { fontSize: 17, fontWeight: 600 } }} // font size of input text.
          InputLabelProps={{ style: { fontSize: 15, fontWeight: 900 } }} // font size of input label.
          className={`laser`}
        />
        <StyledTextField
          id="outlined-basic1215"
          // label="TIME"
          variant="outlined"
          autoComplete="off"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={time}
          fullWidth
          inputProps={{ style: { fontSize: 17, fontWeight: 800, padding: 15 } }} // font size of input text.
          InputLabelProps={{ style: { fontSize: 14, fontWeight: 500 } }} // font size of input label.
          className={`laser`}
        />
        <StyledTextField
          id="outlined-basic1216"
          // label="DATE"
          variant="outlined"
          autoComplete="off"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          value={dateGet()}
          fullWidth
          inputProps={{ style: { fontSize: 17, fontWeight: 800 } }} // font size of input text.
          InputLabelProps={{ style: { fontSize: 14, fontWeight: 500 } }} // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
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
