import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";

import { RoomContext } from "../context/RoomContext";
import { Theme, useTheme } from "@mui/material";

const styles = {
  video: (theme: Theme) => ({
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  }),
  gridContainer: (theme: Theme) => ({
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  }),
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
};

const VideoPlayer = () => {
  const { myVideo, userVideo, userName, callEnded, stream } =
    useContext(RoomContext);
  const theme = useTheme();

  return (
    <Grid container sx={styles.gridContainer(theme)}>
      {stream && (
        <Paper sx={styles.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {localStorage.getItem("name")}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={styles.video(theme)}
            />
          </Grid>
        </Paper>
      )}
      {!callEnded && (
        <Paper sx={styles.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {userName}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={styles.video(theme)}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
