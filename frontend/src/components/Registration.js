import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import roles from "../assets/json/roles.json";
import axios from "axios";
import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



export default function Registration(props) {
  const [newUser, setNewUser] = React.useState({
    firstName: "",
    lastName: "",
    emailId: "",
    roleid: 2,
    company: "",
    password: "",
  });
  const [rolesList, setRolesList] = React.useState(roles);
  const styles = {
    textField: {
      margin: "10px",
      width: "90%",
    },
  };
  const navigate = useNavigate();

  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity
  } = useContext(ToastContext);

  const handleChange = (event, property) => {
    setNewUser({ ...newUser, [property]: event.target.value });
  };

  const onSignUpClick = () => {
    axios.post("/api/registerUser", newUser).then((response) => {
      setOpenToast(true);
      setSeverity("success");
      setToastContent(response.data.message);
      props.closeRegistrationDialog();
      navigate("/")
    }).catch((err) => {
      setOpenToast(true);
      setSeverity("error");
      setToastContent(err.response.data.message);
      props.closeRegistrationDialog();
    });
  };
  return (
    <Dialog
      open={props.openRegistration}
      onClose={props.closeRegistrationDialog}
    >
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            style={styles.textField}
            value={newUser.firstName}
            onChange={(e) => handleChange(e, "firstName")}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            style={styles.textField}
            value={newUser.lastName}
            onChange={(e) => handleChange(e, "lastName")}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            style={styles.textField}
            value={newUser.emailId}
            onChange={(e) => handleChange(e, "emailId")}
          />
          <TextField
            required
            id="outlined-required"
            label="Company Name"
            style={styles.textField}
            value={newUser.company}
            onChange={(e) => handleChange(e, "company")}
          />
          <FormControl style={styles.textField}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              value={newUser.roleid}
              onChange={(e) => handleChange(e, "roleid")}
            >
              {rolesList.map((role) => (
                <MenuItem value={role.id} key={role.id}>
                  {`${role.role}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="Password"
            style={styles.textField}
            value={newUser.password}
            type="password"
            onChange={(e) => handleChange(e, "password")}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeRegistrationDialog}>Cancel</Button>
        <Button onClick={onSignUpClick}>Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
}
