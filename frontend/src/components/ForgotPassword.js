import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");

  const styles = {
    textField: {
      margin: "10px",
      width: "90%",
    },
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const onConfirm = () => {
    console.log(window.location.origin);
    const reqBody = {
      email,
      location: window.location.origin,
    };
    axios
      .post(`/api/forgotPassword`, reqBody)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      open={props.openForgotPasswordDialog}
      onClose={props.closeForgotPasswordDialog}
    >
      <DialogTitle>Forgot/Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="outlined-required"
          label="Email"
          style={styles.textField}
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeForgotPasswordDialog}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
