import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import style from "./mnl.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { Alert, AlertTitle } from "@material-ui/lab";
import { dateGet } from "../../utility/helper";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles(
  (theme) => ({
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
      width: 100,
      height: 45,
      fontSize: 12,
      padding: 5,
      backgroundColor: "#e6ba23",
      color: "black",
      // border: `2px solid black`,
      borderRadius: 10,
      boxShadow: `rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px`,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 3,
      color: "#fff",
    },
  }),
  { index: 1 }
);

const StyledTextField = withStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    width: 100,
    "& .MuiInputBase-root": {
      color: theme.palette.primary.main,
      height: 30,
      // "& input": {
      //   textAlign: "center",
      // },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.secondary.main,
      fontSize: "11px",
    },
  },
}))(TextField);

export const ManulEntry = ({
  bush,
  user = "",
  model = "",
  bushDone = () => {},
  fillStore = () => {},
  fillRows = () => {},
  fillErr = () => {},
}) => {
  const [open, setopen] = useState(false);
  const [mcd, setmcd] = useState("");
  const [mcn, setmcn] = useState("");
  const [psno, setpsno] = useState("");
  const [bin, setbin] = useState("");
  const [bid, setbid] = useState("");
  const [err, seterr] = useState([]);

  const classes = useStyles();

  const handleClickSend = () => {
    if (mcd.length && mcn.length && psno.length) {
      let curDt = mcd;
      let err2 = "";
      if (curDt.length < 6) {
        err2 = "date must be of 6 integers";
        fillErr(err2);
        let idt = setTimeout(() => {
          fillErr("");
        }, 3000);
        return;
      }
      let dt = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear().toString().substr(2);

      let t3 = curDt.toString().substr(4, 2);

      if (t3 > year) {
        err2 = "year must be less than current year";
        return;
      }
      if (mcn.toString().length > 2) {
        err2.push("Machine No cant be more than 2 digits");
        return;
      }

      if (bush) {
        if (bid.length && bin.length) {
          setopen(true); //loading state true
          fillStore({}); //emptying midsection before call
          const socket = socketIOClient(ENDPOINT);
          socket.emit("mnl_entry", {
            operator_name: user,
            machine_date: mcd,
            machine_no: mcn,
            part_sno: psno,
            bushIV_no: bin,
            bushIV_dt: bid,
            model: model,
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
            // socket.disconnect();
          });
        } else {
          console.log("every entry required");
        }
      } else {
        setopen(true); //loading state true
        fillStore({}); //emptying midsection before call
        const socket = socketIOClient(ENDPOINT);
        socket.emit("mnl_entry", {
          operator_name: user,
          machine_date: mcd,
          machine_no: mcn,
          part_sno: psno,
          bushIV_no: "",
          bushIV_dt: "",
          model: model,
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
          socket.disconnect();
        });
      }
    } else {
      seterr("Please enter the details first");
    }
  };

  const handleClose = React.useCallback(() => {}, []);

  return (
    <div className={style.parent}>
      <h3 className={style.hd}>MANUAL ENTRY</h3>
      <div className={style.flexer}>
        <label>Machine Date</label>
        <StyledTextField
          required
          id="outlined-basic1"
          variant="outlined"
          placeholder="ddmmyy"
          autoComplete="off"
          value={mcd}
          size="small"
          onChange={(e) => {
            let inp = e.target.value;

            setmcd(inp);
          }}
        />
        <label>Machine No</label>
        <StyledTextField
          required
          id="outlined-basic2"
          variant="outlined"
          autoComplete="off"
          placeholder="00"
          value={mcn}
          size="small"
          onChange={(e) => {
            let inp = e.target.value;
            setmcn(inp);
          }}
        />
        <label>Part Serial No</label>
        <StyledTextField
          required
          id="outlined-basic3"
          variant="outlined"
          autoComplete="off"
          value={psno}
          size="small"
          onChange={(e) => {
            let inp = e.target.value;
            setpsno(inp);
          }}
        />
        <label>Bush Invoice No</label>
        <StyledTextField
          {...(!bush && { disabled: true })}
          {...(bush && { required: true })}
          id="outlined-basic4"
          variant="outlined"
          autoComplete="off"
          size="small"
          value={bin}
          onChange={(e) => {
            let inp = e.target.value;
            setbin(inp);
          }}
        />
        <label>Bush Invoice Date</label>
        <StyledTextField
          {...(bush && { required: true })}
          {...(!bush && { disabled: true })}
          id="outlined-basic5"
          variant="outlined"
          placeholder="ddmmyy"
          autoComplete="off"
          size="small"
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
            id="newB12"
            variant="outlined"
            color="primary"
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
            id="newB13"
            variant="outlined"
            color="primary"
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
          id="newB13"
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
          <CircularProgress color="secondary" />
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
    fillErr: (data) => dispatch({ type: "ER", payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManulEntry);
