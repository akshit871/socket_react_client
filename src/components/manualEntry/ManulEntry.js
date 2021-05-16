import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import style from "./mnl.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import { dateGet } from "../../utility/helper";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  txt: {
    width: "100px",
    fontSize: "10px",
  },
  btn: {
    alignSelf: "center",
    fontWeight: "900",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 3,
    color: "#fff",
  },
}));

export const ManulEntry = ({
  bush,
  user = "",
  model = "",
  bushDone = () => {},
  fillStore = () => {},
  fillRows = () => {},
}) => {
  const [open, setopen] = useState(false);
  const [mcd, setmcd] = useState("");
  const [mcn, setmcn] = useState("");
  const [psno, setpsno] = useState("");
  const [bin, setbin] = useState("");
  const [bid, setbid] = useState("");

  const [err, seterr] = useState("");
  const classes = useStyles();

  const handleClickSend = () => {
    if (mcd.length && mcn.length && psno.length) {
      setopen(true); //loading state true
      fillStore({}); //emptying midsection before call
      const socket = socketIOClient(ENDPOINT);
      socket.emit("mnl_entry", {
        operator_name: user,
        machine_date: mcd,
        machine_no: mcn,
        part_sno: psno,
        bushIV_no: bush ? bin : "",
        bushIV_dt: bush ? bid : "",
        model: model ? model : "model1",
      });
      socket.on("processDone", (data) => {
        console.log({ data });
        setopen(false);
        setmcd("");
        setmcn("");
        setpsno("");
        setbin("");
        setbid("");
        fillStore(data);
        fillRows(data);
      });
    } else {
      seterr("Please enter the details first");
    }
  };

  const handleClose = React.useCallback(() => {}, []);

  return (
    <div className={style.parent}>
      <h3 className={style.hd}>MANUAL ENTRY</h3>
      <div className={style.flexer}>
        <h5>Machine Date</h5>
        <TextField
          required
          id="outlined-basic1"
          label="Machine Date"
          variant="outlined"
          placeholder="dd/mm/yyyy"
          autoComplete="off"
          value={mcd}
          onChange={(e) => {
            let inp = e.target.value;
            setmcd(inp);
          }}
        />
        <h5>Machine No</h5>
        <TextField
          required
          id="outlined-basic2"
          label="Machine No"
          variant="outlined"
          autoComplete="off"
          value={mcn}
          onChange={(e) => {
            let inp = e.target.value;
            setmcn(inp);
          }}
        />
        <h5>Part Serial No</h5>
        <TextField
          required
          id="outlined-basic3"
          label="Part Serial No"
          variant="outlined"
          autoComplete="off"
          value={psno}
          onChange={(e) => {
            let inp = e.target.value;
            setpsno(inp);
          }}
        />
        <h5>Bush Invoice No</h5>
        <TextField
          {...(!bush && { disabled: true })}
          {...(bush && { required: true })}
          id="outlined-basic4"
          label="Bush Invoice No"
          variant="outlined"
          autoComplete="off"
          value={bin}
          onChange={(e) => {
            let inp = e.target.value;
            setbin(inp);
          }}
        />
        <h5>Bush Invoice Date</h5>
        <TextField
          {...(bush && { required: true })}
          {...(!bush && { disabled: true })}
          id="outlined-basic5"
          label="Bush Invoice Date"
          variant="outlined"
          placeholder="dd/mm/yyyy"
          autoComplete="off"
          value={bid}
          onChange={(e) => {
            let inp = e.target.value;
            setbid(inp);
          }}
        />
      </div>
      <div className={`${style.flexB}`}>
        {bush === true ? (
          <Button
            variant="outlined"
            color="secondary"
            className={classes.btn}
            startIcon={<CheckCircleOutlineOutlinedIcon />}
            onClick={() => {
              bushDone(!bush);
            }}
          >
            BUSH ACTIVE
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            className={classes.btn}
            startIcon={<CancelOutlinedIcon />}
            onClick={() => {
              bushDone(!bush);
            }}
          >
            BUSH ACTIVE
          </Button>
        )}

        <Button
          variant="outlined"
          color="primary"
          className={classes.btn}
          onClick={handleClickSend}
        >
          SEND
        </Button>
      </div>
      {
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      }
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
    bushDone: (data) => dispatch({ type: "BUSH_D", payload: data }),
    fillStore: (data) => dispatch({ type: "UPDATE_STORE", payload: data }),
    fillRows: (data) => dispatch({ type: "UPDATE_ROW", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManulEntry);
