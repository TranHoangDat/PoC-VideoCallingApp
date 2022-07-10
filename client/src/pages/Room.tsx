import { Box, Typography } from "@mui/material";
import AppBar from "../components/AppBar";
import Notifications from "../components/Notifications";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "../components/VideoPlayer";

export default function Room() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AppBar>
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>
      <VideoPlayer />
      {/* <Sidebar>
        <Notifications />
      </Sidebar> */}
    </Box>
  );
}
