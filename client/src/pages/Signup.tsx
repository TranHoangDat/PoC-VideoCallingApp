import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUpHandler from "../handlers/signUpHandler";

export default function Signup() {
  const paperStyle = {
    padding: "30px 20px",
    width: "380px",
    margin: "20px auto",
  };
  const headerStyle = { margin: 0 };
  const marginTop = { marginTop: "10px" };
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [role, setRole] = useState<string>("tutee");
  const [password, setPassword] = useState<string>();

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangeRole = (e: any) => {
    setRole(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const isSuccessful = await signUpHandler({ role, name, email, password });

    if (isSuccessful) {
      navigate("/login");
    } else {
      alert("Sign up failed!!!");
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <h2 style={headerStyle}>Sign Up</h2>
        <form style={marginTop}>
          <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              style={{ display: "initial" }}
            >
              <FormControlLabel
                onClick={e => handleChangeRole(e)}
                value="tutee"
                control={<Radio />}
                label="Tutee"
                checked={role === "tutee"}
              />
              <FormControlLabel
                onClick={e => handleChangeRole(e)}
                value="tutor"
                control={<Radio />}
                label="Tutor"
                checked={role === "tutor"}
              />
            </RadioGroup>
          </FormControl>
          <TextField
            onChange={e => handleChangeName(e)}
            value={name}
            fullWidth
            label="Name"
            placeholder="Enter your name"
          />
          <TextField
            onChange={e => handleChangeEmail(e)}
            value={email}
            sx={marginTop}
            fullWidth
            label="Email"
            placeholder="Enter your email"
          />
          <TextField
            onChange={e => handleChangePassword(e)}
            value={password}
            sx={marginTop}
            fullWidth
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button
            onClick={handleSubmit}
            sx={marginTop}
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
