import { IconButton, Paper, TextField, withStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import style from "./mid.module.css";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    yesbtn: {
      "& svg": {
        fontSize: "1em",
      },
      color: "palegreen",
    },
    nobtn: {
      "& svg": {
        fontSize: "1em",
      },
      color: "red",
    },
    yesbtn2: {
      "& svg": {
        fontSize: "1em",
      },
      color: "green",
    },
    nobtn2: {
      "& svg": {
        fontSize: "1em",
      },
      color: "red",
    },
    largeIcon: {
      fontSize: "3em",
    },
  }),
  { index: 1 }
);

const StyledTextField = withStyles((theme) => ({
  root: {
    // width: 100,
    border: `2px groove darkblue`,
    borderRadius: 9,
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
    "& .MuiInputBase-root": {
      color: "black",
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

export const Mid = ({
  laser,
  scanner,
  dot,
  part_sno,
  okf,
  nokf,
  machine_no,
}) => {
  const classes = useStyles();

  const [laserdt, setlaserdt] = useState(() => {
    return laser ? laser : "";
  });
  const [scannerdt, setscannerdt] = useState(() => {
    return scanner ? scanner : "";
  });
  const [mnlscanner, setmnlscanner] = useState(() => {
    return dot ? dot : "";
  });

  const [ok, setok] = useState(okf ? okf : null);

  const [nok, setnok] = useState(nokf ? nokf : null);

  const [psno, setpsno] = useState(() => {
    return part_sno ? part_sno : "";
  });
  const [mcn, setmcn] = useState(() => {
    return machine_no ? machine_no : "";
  });

  useEffect(() => {
    if (laser) setlaserdt(laser);
    if (scanner) setscannerdt(scanner);
    if (dot) setmnlscanner(dot);
    if (okf) setok(okf);
    if (nokf) setnok(nokf);
    if (part_sno) setpsno(part_sno);
    if (machine_no) setmcn(machine_no);
    return () => {};
  }, [laser, scanner, dot, part_sno, okf, nokf, machine_no]);

  return (
    <div className={style.parent}>
      <div className={style.card3}>
        <div className={style.card1}>
          <div className={style.heading_card}>
            <label style={{ marginBottom: "1px" }}>
              <strong>LASER</strong>
            </label>
            {laserdt && (
              <IconButton className={classes.yesbtn}>
                <CheckCircleOutlineOutlinedIcon />
              </IconButton>
            )}
            {!laserdt && (
              <IconButton className={classes.nobtn}>
                <CancelOutlinedIcon />
              </IconButton>
            )}
          </div>
          <StyledTextField
            id="outlined-basic123"
            variant="outlined"
            autoComplete="off"
            InputProps={{
              readOnly: true,
            }}
            size="medium"
            value={laserdt}
            fullWidth
            inputProps={{ style: { fontSize: 25, fontWeight: 800 } }} // font size of input text.
            // InputLabelProps={{style: {fontSize: 35}}} // font size of input label.
            className={`${laserdt ? style.laser : ""}`}
          />
        </div>
        <div className={`${style.card1}`}>
          <div className={style.heading_card}>
            <label style={{ marginTop: "10px", marginBottom: "10px" }}>
              <strong>SCANNER</strong>
            </label>
            {<IconButton />}
            {scannerdt && (
              <IconButton className={classes.yesbtn}>
                <CheckCircleOutlineOutlinedIcon className={classes.largeIcon} />
              </IconButton>
            )}

            {!scannerdt && (
              <IconButton className={classes.nobtn}>
                <CancelOutlinedIcon />
              </IconButton>
            )}
          </div>
          <StyledTextField
            id="outlined-basic134"
            variant="outlined"
            autoComplete="off"
            InputProps={{
              readOnly: true,
            }}
            size="medium"
            value={scannerdt}
            fullWidth
            inputProps={{ style: { fontSize: 25, fontWeight: 800 } }} // font size of input text.
            // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
            className={`${scannerdt ? style.laser : ""} laser`}
          />
        </div>
      </div>
      <div className={style.card4}>
        <div className={style.card1}>
          <div className={style.heading_card}>
            <label style={{ marginTop: "10px", marginBottom: "10px" }}>
              <strong>Manual Scanner</strong>
            </label>
            {mnlscanner && (
              <IconButton className={classes.yesbtn}>
                <CheckCircleOutlineOutlinedIcon className={classes.largeIcon} />
              </IconButton>
            )}

            {!mnlscanner && (
              <IconButton className={classes.nobtn}>
                <CancelOutlinedIcon />
              </IconButton>
            )}
          </div>
          <StyledTextField
            id="outlined-basic156"
            variant="outlined"
            autoComplete="off"
            InputProps={{
              readOnly: true,
            }}
            size="medium"
            value={mnlscanner}
            fullWidth
            inputProps={{ style: { fontSize: 30, fontWeight: 500 } }} // font size of input text.
            // InputLabelProps={{style: {fontSize: 30}}} // font size of input label.
          />
        </div>
        <div className={style.btns}>
          <div
            className={`${style.okheading_card} ${style.okcard} ${
              ok ? style.green : ""
            }`}
          >
            <label style={{ marginTop: "5px" }}>
              <strong>Marked OK</strong>
            </label>
            {ok && (
              <IconButton className={classes.yesbtn2}>
                <CheckCircleOutlineOutlinedIcon className={classes.largeIcon} />
              </IconButton>
            )}

            {!ok && (
              <IconButton className={classes.nobtn2}>
                <CancelOutlinedIcon />
              </IconButton>
            )}
          </div>
          <div
            className={`${style.okheading_card} ${style.nokcard} ${
              nok ? style.red : ""
            }`}
          >
            <label style={{ marginTop: "5px" }}>
              <strong>Marked NG</strong>
            </label>
            {nok && (
              <IconButton className={classes.yesbtn2}>
                <CheckCircleOutlineOutlinedIcon className={classes.largeIcon} />
              </IconButton>
            )}

            {!nok && (
              <IconButton className={classes.nobtn2}>
                <CancelOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  laser: state.entryRd["laser_done"] ? state.entryRd["Laser Data"] : null,
  scanner: state.entryRd["scanner_done"] ? state.entryRd["Scanner Data"] : null,
  dot: state.entryRd["DOT Matrix Data"],
  part_sno: state.entryRd["Part Sno"],
  okf: state.entryRd["Result"] == true ? "OK" : null,
  nokf: state.entryRd["Result"] == false ? "NOK" : null,
  machine_no: state["M/C No"],
});

const mapDispatchToProps = (dispatch) => {
  return {
    bushDone: (data) => dispatch({ type: "BUSH_D" }, data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mid);
