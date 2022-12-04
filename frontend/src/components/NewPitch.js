import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function NewPitch(props) {
  const [newPitch, setNewPitch] = useState({
    idea_name: "",
    short_description: "",
    long_description: "",
    ppt: "",
    video: "",
    company_valuation: 125000,
    equity: 5,
    plan: "",
    progress: "",
    categories: "",
  });

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
  };
  const [pitchValidation, setpitchValidation] = useState({
    idea_nameValid: true,
    idea_nameError: "",
    short_descriptionValid: true,
    short_descriptionError: "",
    long_descriptionValid: true,
    long_descriptionError: "",
    pptValid: true,
    pptError: "",
    videoValid: true,
    videoError: "",
    company_valuationValid: true,
    company_valuationError: "",
    equityValid: true,
    equityError: "",
    planValid: true,
    planError: "",
    progressValid: true,
    progressError: "",
    categoriesValid:true,
    categoriesError: "",
  });

  const {
    email,
    setEmail,
    session,
    setSession,
    loggedInUser,
    setLoggedInUser,
  } = useContext(UserContext);

  const handleChange = (event, prop) => {
    setNewPitch({ ...newPitch, [prop]: event.target.value });
  };

  useEffect(() => {
    if (props.openNewPitch === false) {
      setNewPitch({
        idea_name: "",
        short_description: "",
        long_description: "",
        ppt: "",
        video: "",
        company_valuation: 125000,
        equity: 5,
        plan: "",
        progress: "",
        categories: "",
      });
    }
  }, [props.openNewPitch]);

  const validateForm = (field) => {
    const idea_nameValid = newPitch.idea_name.trim() !== "";
    const idea_nameError = idea_nameValid ? "" : "This field is required.";

    const short_descriptionValid = newPitch.short_description.trim() !== "";
    const short_descriptionError = short_descriptionValid ? "" : "This field is required.";

    const long_descriptionValid = newPitch.long_description.trim() !== "";
    const long_descriptionError = long_descriptionValid ? "" : "This field is required.";

    // const pptValid = newPitch.ppt.trim() !== "";
    // const pptError = pptValid ? "" : "This field is required.";

    // const videoValid = newPitch.video.trim() !== "";
    // const videoError = videoValid ? "" : "This field is required.";

    const company_valuationValid = newPitch.company_valuation > 0;
    const company_valuationError = company_valuationValid ? "" : "This field is required.";
    console.log(newPitch.equity);
    const equityValid = newPitch.equity > 0;
    const equityError = equityValid ? "" : "This field is required.";

    const planValid = newPitch.plan.trim() !== "";
    const planError = planValid ? "" : "This field is required.";

    const progressValid = newPitch.progress.trim() !== "";
    const progressError = progressValid ? "" : "This field is required.";

    // const categoriesValid = newPitch.progress.trim() !== "";
    // const categoriesError = categoriesValid ? "" : "This field is required.";
    setpitchValidation({
      idea_nameValid,
      idea_nameError,
      short_descriptionValid,
      short_descriptionError,
      long_descriptionValid,
      long_descriptionError,
      // pptValid,
      // pptError,
      // videoValid,
      // videoError,
      company_valuationValid,
      company_valuationError,
      equityValid,
      equityError,
      planValid,
      planError,
      progressValid,
      progressError,
      // categoriesValid,
      // categoriesError,
    });

    return (
      idea_nameValid &&
      short_descriptionValid &&
      long_descriptionValid &&
      // pptValid &&
      // videoValid &&
      company_valuationValid &&
      equityValid &&
      planValid &&
      progressValid
      // categoriesValid
    );
  };
  const onCreateClick = () => { 
    if(validateForm()){
    const reqBody = {
      newPitch: newPitch,
      userId: loggedInUser.id,
    };
    axios
      .post("/api/createNewPitch", reqBody)
      .then((response) => {
        console.log(response);
        props.closeNewPitchModal(null, true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const onClose = () => {
    setNewPitch({
      idea_name: "",
      short_description: "",
      long_description: "",
      ppt: "",
      video: "",
      company_valuation: 125000,
      equity: 5,
      plan: "",
      progress: "",
      categories: "",
    })
    setpitchValidation({
      idea_nameValid: true,
      idea_nameError: "",
      short_descriptionValid: true,
      short_descriptionError: "",
      long_descriptionValid: true,
      long_descriptionError: "",
      pptValid: true,
      pptError: "",
      videoValid: true,
      videoError: "",
      company_valuationValid: true,
      company_valuationError: "",
      equityValid: true,
      equityError: "",
      planValid: true,
      planError: "",
      progressValid: true,
      progressError: "",
      categoriesValid:true,
      categoriesError: "",
    })
    props.closeNewPitchModal();
  }
  return (
    <Dialog open={props.openNewPitch} onClose={onClose}>
      <DialogTitle>Propose New Pitch</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            required
            id="outlined-required"
            label="Idea Name"
            style={styles.textField}
            value={newPitch.idea_name}
            onChange={(e) => handleChange(e, "idea_name")}
            sx={{
              fieldset: pitchValidation.idea_nameValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
          />
          {!pitchValidation.idea_nameValid && (
            <p style={styles.errorText}>{pitchValidation.idea_nameError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Short Description"
            style={styles.textField}
            value={newPitch.short_description}
            onChange={(e) => handleChange(e, "short_description")}
            sx={{
              fieldset: pitchValidation.short_descriptionValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
          />
          {!pitchValidation.short_descriptionValid && (
            <p style={styles.errorText}>{pitchValidation.short_descriptionError}</p>
          )}
        
          <TextField
            required
            id="outlined-required"
            label="Long Description"
            style={styles.textField}
            value={newPitch.long_description}
            onChange={(e) => handleChange(e, "long_description")}
            sx={{
              fieldset: pitchValidation.long_descriptionValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
          />
          {!pitchValidation.long_descriptionValid && (
            <p style={styles.errorText}>{pitchValidation.long_descriptionError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Valuation"
            style={styles.textField}
            value={newPitch.company_valuation}
            type="number"
            onChange={(e) => handleChange(e, "company_valuation")}
            sx={{
              fieldset: pitchValidation.company_valuationValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
          />
          {!pitchValidation.company_valuationValid && (
            <p style={styles.errorText}>{pitchValidation.company_valuationError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Equity"
            style={styles.textField}
            value={newPitch.equity}
            type="number"
            onChange={(e) => handleChange(e, "equity")}
            sx={{
              fieldset: pitchValidation.equityValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
          />
          {!pitchValidation.equityValid && (
            <p style={styles.errorText}>{pitchValidation.equityError}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Progress So Far"
            style={styles.textField}
            value={newPitch.progress}
            onChange={(e) => handleChange(e, "progress")}
            sx={{
              fieldset: pitchValidation.progressValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
            />
            {!pitchValidation.progressValid && (
              <p style={styles.errorText}>{pitchValidation.progressError}</p>
            )}
          <TextField
            required
            id="outlined-required"
            label="Plan"
            style={styles.textField}
            value={newPitch.plan}
            onChange={(e) => handleChange(e, "plan")}
            sx={{
              fieldset: pitchValidation.planValid
                ? styles.textfieldStyle
                : styles.errorStyle,
            }}
          />
          {!pitchValidation.planValid && (
            <p style={styles.errorText}>{pitchValidation.planError}</p>
          )}

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreateClick}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
