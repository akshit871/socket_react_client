import React from "react";
import ManulEntry from "../manualEntry/ManulEntry";
import Mid from "../midSection/Mid";
import styles from "./hm.module.css";

function homepage() {
  return (
    <div className={styles.gridParent}>
      <ManulEntry />
      <Mid />
    </div>
  );
}

export default homepage;
