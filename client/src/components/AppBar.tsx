import { AppBar as MuiAppBar, AppBarProps, styled } from "@mui/material";

const AppBar = styled(({ ...props }: AppBarProps) => <MuiAppBar {...props} />)(
  ({ theme }) => ({
    position: "static",
    color: "inherit",
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  })
);

export default AppBar;
