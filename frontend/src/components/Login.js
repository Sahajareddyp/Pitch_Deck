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
      border: "1px solid #5DFFED",
      padding: "15px",
      minHeight: "80vh",
    },
    footerLinksDiv: {
      display: "flex",
      justifyContent: "space-between",
      margin: "10px",
    },
    errorStyle: {
      borderColor: "red",
    },
    textfieldStyle: {
      borderColor: "#5DFFED",
    },
    textfieldColor: {
      color: "#5DFFED"
    },
    errorText: {
      color: "red",
      float: "left",
      marginTop: "0px"
    },
    linkStyle: {
      color: "#5DFFED"
    },
    buttonStyle: {
      backgroundColor: "#5DFFED",
      color: "#18171B"
    }
  };

  const [openRegistration, setOpenRegistration] = React.useState(false);
  const [credential, setCredentials] = React.useState({
    email: "",
    password: "",
  });
  const [credentialValidation, setCredentialValidation] = React.useState({
    emailValid: true,
    passwordValid: true,
    emailError: "",
    passwordError: "",
  });
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    React.useState(false);

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
    setSeverity,
  } = React.useContext(ToastContext);

  const openDialog = () => {
    setOpenRegistration(true);
  };

  const closeRegistrationDialog = () => {
    setOpenRegistration(false);
  };

  const textChangeHandler = (event, prop) => {
    setCredentials({ ...credential, [prop]: event.target.value.trim() });
  };

  const validateForm = () => {
    const emailValid = credential.email !== "";
    const emailError = emailValid ? "" : "Please enter a valid email Id";
    const passwordValid = credential.password !== "";
    const passwordError = passwordValid ? "" : "This field cannot be empty";
    setCredentialValidation({
      emailValid,
      emailError,
      passwordValid,
      passwordError,
    });
    return emailValid && passwordValid;
  };

  const closeForgotPasswordDialog = () => {
    setOpenForgotPasswordDialog(false);
  };

  const handleSignIn = () => {
    if (validateForm()) {
      axios
        .post("/api/login", credential)
        .then((response) => {
          console.log(response);
          setEmail(credential.email);
          setSession(response.data.session.access_token);
          window.sessionStorage.setItem(
            "sessionKey",
            response.data.session.access_token
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setOpenToast(true);
          setSeverity("error");
          setToastContent(err.response.data.message);
        });
    }
  };

  React.useEffect(() => {
    if (sessionStorage.getItem("sessionKey")) {
      navigate("/");
    }
  }, []);
  return (
    <Box style={styles.box}>
      <Container style={styles.container} maxWidth="sm">
        <TextField
          required
          id="outlined-required"
          label="Email"
          fullWidth
          sx={{
            fieldset: !credentialValidation.emailValid ? styles.errorStyle: styles.textfieldStyle
          }}
          InputLabelProps={{
            style: styles.textfieldColor,
          }}
          value={credential.email}
          onChange={(e) => textChangeHandler(e, "email")}
        />
        {!credentialValidation.emailValid && (
          <p style={styles.errorText}>{credentialValidation.emailError}</p>
        )}
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
          sx={{
            fieldset: !credentialValidation.passwordValid ? styles.errorStyle: styles.textfieldStyle
          }}
          InputLabelProps={{
            style: styles.textfieldColor,
          }}
          onChange={(e) => textChangeHandler(e, "password")}
        />
        {!credentialValidation.passwordValid && (
          <p style={styles.errorText}>{credentialValidation.passwordError}</p>
        )}

        {}
        <br />
        <br />
        <Button style={styles.buttonStyle} variant="contained" fullWidth onClick={handleSignIn}>
          Sign In
        </Button>
        <div style={styles.footerLinksDiv}>
          <Link
            component="button"
            variant="body2"
            style={styles.linkStyle}
            onClick={() => {
              // setOpenForgotPasswordDialog(true);
            }}
          >
            Forgot Password?
          </Link>
          <Link style={styles.linkStyle} component="button" variant="body2" onClick={openDialog}>
            Sign Up
          </Link>
        </div>
      </Container>
      <Registration
        openRegistration={openRegistration}
        closeRegistrationDialog={closeRegistrationDialog}
      />
      <ForgotPassword
        openForgotPasswordDialog={openForgotPasswordDialog}
        closeForgotPasswordDialog={closeForgotPasswordDialog}
      />
    </Box>
  );
}
