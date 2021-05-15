import React, { useState, useEffect } from "react";
import { dateGet } from "./utility/helper";
import socketIOClient from "socket.io-client";
import "./App.css";

import Homepage from "./components/homepage/homepage";

function App() {
  return (
    <div className="gridParent">
      <Homepage />
    </div>
  );
}

export default App;
