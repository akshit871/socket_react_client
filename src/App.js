import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log("hgjg");
    const socket = socketIOClient(ENDPOINT);
    socket.emit("mnl_entry", { name: "abc", date: "98", part: "098k" });
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
