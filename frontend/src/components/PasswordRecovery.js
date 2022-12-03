import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PasswordRecovery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const styles = {
    textField: {
      margin: "10px",
      width: "90%",
    },
  };

  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const confirm = () => {
    const hash = window.location.hash;
    const hashArr = hash
      .substring(1)
      .split("&")
      .map((param) => param.split("="));
    let type;
    let accessToken;
    for (const [key, value] of hashArr) {
      if (key === "type") {
        type = value;
      } else if (key === "access_token") {
        accessToken = value;
      }
    }
    console.log(type);
    console.log(accessToken);
    const reqBody = {
      type,
      accessToken,
    };
    axios
      .post("/api/resetPassword", reqBody)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <TextField
        required
        id="outlined-required"
        label="New Password"
        style={styles.textField}
        value={password}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <Button onClick={confirm}>Confirm</Button>
    </Box>
  );
}
