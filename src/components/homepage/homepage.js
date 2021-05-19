import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import StickyHeadTable from "../exceltable/excel";
import LoginInfo from "../login/loginInfo";
import ManulEntry from "../manualEntry/ManulEntry";
import Mid from "../midSection/Mid";
import { connect } from "react-redux";
import styles from "./hm.module.css";

function Homepage({ err }) {
  return (
    <div className={styles.lay}>
      <div className={styles.gridParent}>
        <ManulEntry />
        <Mid />
        <LoginInfo />
      </div>
      {err && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      )}
      <StickyHeadTable />
    </div>
  );
}
const mapStateToProps = (state) => ({
  err: state.errRd.msg,
});
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
