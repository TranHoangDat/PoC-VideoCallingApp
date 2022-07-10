import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginHandler from "../handlers/loginHandler";

export default function Login() {
  const paperStyle = {
    padding: "20px",
    width: "380px",
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const marginTop = { marginTop: "10px" };
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const isSuccessful = await loginHandler({ email, password });

    if (isSuccessful) {
      navigate("/dashboard");
    } else {
      alert("Login error !!!");
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <h2>Sign In</h2>
        <TextField
          value={email}
          onChange={e => handleChangeEmail(e)}
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
        />
        <TextField
          value={password}
          onChange={e => handleChangePassword(e)}
          sx={marginTop}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <Typography sx={marginTop}>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography sx={marginTop}>
          {" "}
          Do you have an account ?<Link href="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
