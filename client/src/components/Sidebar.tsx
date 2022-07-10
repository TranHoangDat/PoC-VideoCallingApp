import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Theme,
  useTheme,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";

import { RoomContext } from "../context/RoomContext";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: (theme: Theme) => ({
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  }),
  container: (theme: Theme) => ({
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  }),
  margin: {
    marginTop: "20px",
  },
  padding: {
    padding: "20px",
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
};

export default function Sidebar({ children }: React.PropsWithChildren<{}>) {
  const { callEnded, leaveCall, callUser } = useContext(RoomContext);
  const [idToCall, setIdToCall] = useState("");
  const theme = useTheme();

  return (
    <Container sx={styles.container(theme)}>
      <Paper elevation={10} sx={styles.paper}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container sx={styles.gridContainer(theme)}>
            <Grid item xs={12} md={6} sx={styles.padding}>
              {!callEnded && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  sx={styles.margin}
                >
                  Hang Up
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}
