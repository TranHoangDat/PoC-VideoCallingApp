import React, { useContext } from "react";
import { Button } from "@mui/material";
import { DashboardContext } from "../context/DashboardContext";

export default function Notifications() {
  const { answerCall, call, callAccepted } = useContext(DashboardContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
}
