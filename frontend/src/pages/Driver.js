import React, { useState, useEffect } from "react";
import socket from "../services/socket";

function Driver() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random();
      setValue(newValue);
      socket.emit("message", newValue);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Driver Page</h1>
      <p>Value sent to server every 5 seconds: {value}</p>
    </div>
  );
}

export default Driver;
