import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Link, TextField } from "@mui/material";
import Registration from "./Registration";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ToastContext } from "../contexts/ToastContext";
import ForgotPassword from "./ForgotPassword";

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
  const [credential, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = React.useState(false);

  const navigate = useNavigate();
  const {
    email,
    setEmail,
    session,
    setSession,
    loggedInUser,
    setLoggedInUser,
  } = React.useContext(UserContext);

  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity
  } = React.useContext(ToastContext);

  const openDialog = () => {
    setOpenRegistration(true);
  };

  const closeRegistrationDialog = () => {
    setOpenRegistration(false);
  };

  const textChangeHandler = (event, prop) => {
    setCredentials({ ...credential, [prop]: event.target.value });
  };

  const closeForgotPasswordDialog = () => {
    setOpenForgotPasswordDialog(false);
  }

  const handleSignIn = () => {
    axios
      .post("/api/login", credential)
      .then((response) => {
        console.log(response);
        setEmail(credential.email);
        setSession(response.data.session.access_token);
        window.sessionStorage.setItem("sessionKey", response.data.session.access_token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setOpenToast(true);
        setSeverity("error");
        setToastContent(err.response.data.message);
      });
  };

  React.useEffect(() => {
    if(sessionStorage.getItem("sessionKey")){
      navigate("/");
    }
  }, [])
  return (
    <Box style={styles.box}>
      <Container style={styles.container} maxWidth="sm">
        <TextField
          required
          id="outlined-required"
          label="Email"
          fullWidth
          value={credential.email}
          onChange={(e) => textChangeHandler(e, "email")}
        />
        <br />
        <br />
        <br />
        <TextField
          required
          id="outlined-required"
          label="Password"
          fullWidth
          value={credential.password}
          type="password"
          onChange={(e) => textChangeHandler(e, "password")}
        />
        <br />
        <br />
        <br />
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          Sign In
        </Button>
        <div style={styles.footerLinksDiv}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              setOpenForgotPasswordDialog(true);
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
      <ForgotPassword openForgotPasswordDialog={openForgotPasswordDialog} closeForgotPasswordDialog={closeForgotPasswordDialog}/>
    </Box>
  );
}
