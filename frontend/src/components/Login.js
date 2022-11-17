import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Link, TextField } from "@mui/material";
import Registration from "./Registration";

export default function Login() {
  const styles = {
    box: {
      margin: "25px",
    },
    container: {
      border: "1px solid blue",
      padding: "15px",
      minHeight: "80vh",
    },
    footerLinksDiv: {
      display: "flex",
      justifyContent: "space-between",
      margin: "10px",
    },
  };

  const [openRegistration, setOpenRegistration] = React.useState(false);

  const openDialog = () => {
    setOpenRegistration(true);
  };

  const closeRegistrationDialog = () => {
    setOpenRegistration(false);
  };
  return (
    <Box style={styles.box}>
      <Container style={styles.container} maxWidth="sm">
        <TextField required id="outlined-required" label="Email" fullWidth />
        <br />
        <br />
        <br />
        <TextField required id="outlined-required" label="Password" fullWidth />
        <br />
        <br />
        <br />
        <Button variant="contained" fullWidth>
          Sign In
        </Button>
        <div style={styles.footerLinksDiv}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgot Password?
          </Link>
          <Link component="button" variant="body2" onClick={openDialog}>
            Sign Up
          </Link>
        </div>
      </Container>
      <Registration
        openRegistration={openRegistration}
        closeRegistrationDialog={closeRegistrationDialog}
      />
    </Box>
  );
}
