import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import Notifications from "../components/Notifications";
import { DashboardContext } from "../context/DashboardContext";

export default function Dashboard() {
  const { joinedUsers, callUser } = useContext(DashboardContext);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {joinedUsers &&
          Object.keys(joinedUsers).map((key, index) => (
            <Grid key={index} item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {joinedUsers[key]}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => callUser(key)} size="small">
                    Call
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Notifications />
    </Box>
  );
}
