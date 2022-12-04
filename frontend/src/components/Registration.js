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
import { styled } from "@mui/system";

export default function Registration(props) {
  const [newUser, setNewUser] = React.useState({
    firstName: "",
    lastName: "",
    emailId: "",
    roleid: 2,
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [userValidation, setUserValidation] = React.useState({
    firstNameValid: true,
    firstNameError: "",
    lastNameValid: true,
    lastNameError: "",
    emailIdValid: true,
    emailIdError: "",
    companyValid: true,
    companyError: "",
    passwordValid: true,
    passwordError: "",
    confirmPasswordValid: true,
    confirmPasswordError: "",
  });

  const [rolesList, setRolesList] = React.useState(roles);

  const CustomSelect = styled(Select)(() => ({
    width: 300,
    "&.MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }));

  const styles = {
    textField: {
      margin: "10px",
      width: "90%",
    },
    errorStyle: {
      borderColor: "red",
    },
    textfieldStyle: {
      borderColor: "#5DFFED",
    },
    errorText: {
      color: "red",
      marginTop: "0px",
      marginLeft: "10px",
      width: "90%",
    },
    dialogStyle: {
      backgroundColor: "#18171B",
      borderColor: "#5DFFED",
      color: "#5DFFED",
    },
    textfieldColor: {
      color: "#5DFFED",
    },
    menuItemStyle: {
      backgroundColor: "#18171B",
      color: "#5DFFED",
      margin: "0px"
    },
    select: {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#5DFFED',
        color: "#5DFFED"
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#5DFFED',
        borderWidth: '0.15rem',
      },
      '.MuiSvgIcon-root': {
        color: "#5DFFED"
      },
      '.MuiList-padding': {
        padding: "0px"
      },
      '.MuiSelect-nativeInput': {
        color: "#5DFFED"
      },
      color: "#5DFFED"
    },
    buttonStyle: {
      borderColor: "#5DFFED",
      color: "#5DFFED"
    }
  };
  const navigate = useNavigate();

  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity,
  } = useContext(ToastContext);

  const handleChange = (event, property) => {
    setNewUser({ ...newUser, [property]: event.target.value });
  };

  const validateForm = (field) => {
    const firstNameValid = newUser.firstName.trim() !== "";
    const firstNameError = firstNameValid ? "" : "This field is required.";

    const lastNameValid = newUser.lastName.trim() !== "";
    const lastNameError = lastNameValid ? "" : "This field is required.";

    const emailIdValid = newUser.emailId.trim() !== "";
    const emailIdError = emailIdValid ? "" : "This field is required.";

    const companyValid = newUser.company.trim() !== "";
    const companyError = companyValid ? "" : "This field is required.";

    const passwordValid = newUser.password.trim() !== "";
    const passwordError = passwordValid ? "" : "This field is required.";

    const confirmPasswordValid =
      newUser.confirmPassword.trim() === newUser.password.trim();
    const confirmPasswordError = confirmPasswordValid
      ? ""
      : "This field should match Password.";
    setUserValidation({
      firstNameValid,
      firstNameError,
      lastNameError,
      lastNameValid,
      emailIdError,
      emailIdValid,
      companyError,
      companyValid,
      passwordError,
      passwordValid,
      confirmPasswordValid,
      confirmPasswordError,
    });

    return (
      firstNameValid &&
      lastNameValid &&
      companyValid &&
      emailIdValid &&
      passwordValid &&
      confirmPasswordValid
    );
  };

  const onSignUpClick = () => {
    if (validateForm()) {
      axios
        .post("/api/registerUser", newUser)
        .then((response) => {
          setOpenToast(true);
          setSeverity("success");
          setToastContent(response.data.message);
          props.closeRegistrationDialog();
          navigate("/");
        })
        .catch((err) => {
          setOpenToast(true);
          setSeverity("error");
          setToastContent(err.response.data.message);
          props.closeRegistrationDialog();
        });
    }
  };

  const closeDialog = () => {
    setUserValidation({
      firstNameValid: true,
      firstNameError: "",
      lastNameValid: true,
      lastNameError: "",
      emailIdValid: true,
      emailIdError: "",
      companyValid: true,
      companyError: "",
      passwordValid: true,
      passwordError: "",
      confirmPasswordValid: true,
      confirmPasswordError: "",
    });
    setNewUser({
      firstName: "",
      lastName: "",
      emailId: "",
      roleid: 2,
      company: "",
      password: "",
      confirmPassword: "",
    });
    props.closeRegistrationDialog();
  };

  return (
    <Dialog
      open={props.openRegistration}
      onClose={closeDialog}
      PaperProps={{ style: styles.dialogStyle }}
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
            sx={{
              fieldset: userValidation.firstNameValid
                ? styles.textfieldStyle
                : styles.errorStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          {!userValidation.firstNameValid && (
            <p style={styles.errorText}>{userValidation.firstNameError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            style={styles.textField}
            value={newUser.lastName}
            onChange={(e) => handleChange(e, "lastName")}
            sx={{
              fieldset: userValidation.lastNameValid
                ? styles.textfieldStyle
                : styles.errorStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          {!userValidation.lastNameValid && (
            <p style={styles.errorText}>{userValidation.lastNameError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Email"
            style={styles.textField}
            value={newUser.emailId}
            onChange={(e) => handleChange(e, "emailId")}
            sx={{
              fieldset: userValidation.emailIdValid
                ? styles.textfieldStyle
                : styles.errorStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          {!userValidation.emailIdValid && (
            <p style={styles.errorText}>{userValidation.emailIdError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Company Name"
            style={styles.textField}
            value={newUser.company}
            onChange={(e) => handleChange(e, "company")}
            sx={{
              fieldset: userValidation.companyValid
                ? styles.textfieldStyle
                : styles.errorStyle,
              input: styles.textfieldColor,
              '&:hover': {
                color: "#5DFFED",
              }
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          {!userValidation.companyValid && (
            <p style={styles.errorText}>{userValidation.companyError}</p>
          )}
          <FormControl style={styles.textField}>
            <InputLabel
              id="demo-simple-select-label"
              style={styles.textfieldColor}
            >
              Role
            </InputLabel>
            <Select
                
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              value={newUser.roleid}
              onChange={(e) => handleChange(e, "roleid")}
              sx={styles.select}
              // sx={{
              //   fieldset: styles.textfieldStyle,
              //   root: styles.textfieldColor,
              //   icon: styles.textfieldColor,
              //   color: "#5DFFED",
              //   '&:hover': {
              //     color: "#5DFFED",
              //   }
              // }}
            >
              {rolesList.map((role) => (
                <MenuItem
                  style={styles.menuItemStyle}
                  value={role.id}
                  key={role.id}
                >
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
            sx={{
              fieldset: userValidation.passwordValid
                ? styles.textfieldStyle
                : styles.errorStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          {!userValidation.passwordValid && (
            <p style={styles.errorText}>{userValidation.passwordError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            style={styles.textField}
            value={newUser.confirmPassword}
            type="password"
            onChange={(e) => handleChange(e, "confirmPassword")}
            sx={{
              fieldset: userValidation.confirmPasswordValid
                ? styles.textfieldStyle
                : styles.errorStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          {!userValidation.confirmPasswordValid && (
            <p style={styles.errorText}>
              {userValidation.confirmPasswordError}
            </p>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button style={styles.buttonStyle} variant="outlined" onClick={closeDialog}>Cancel</Button>
        <Button style={styles.buttonStyle} variant="outlined" onClick={onSignUpClick}>Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
}
