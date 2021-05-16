import React from "react";
import StickyHeadTable from "../exceltable/excel";
import LoginInfo from "../login/loginInfo";
import ManulEntry from "../manualEntry/ManulEntry";
import Mid from "../midSection/Mid";
import styles from "./hm.module.css";

function homepage() {
  return (
    <div className={styles.lay}>
      <div className={styles.gridParent}>
        <ManulEntry />
        <Mid />
        <LoginInfo />
      </div>
      <StickyHeadTable />
    </div>
  );
}

export default homepage;
