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
  };

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

  const onCreateClick = () => {
    const reqBody = {
      newPitch: newPitch,
      userId: loggedInUser.id,
    };
    axios
      .post("/api/createNewPitch", reqBody)
      .then((response) => {
        console.log(response);
        props.closeNewPitchModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog open={props.openNewPitch} onClose={props.closeNewPitchModal}>
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
          />
          <TextField
            required
            id="outlined-required"
            label="Short Description"
            style={styles.textField}
            value={newPitch.short_description}
            onChange={(e) => handleChange(e, "short_description")}
          />
          <TextField
            required
            id="outlined-required"
            label="Long Description"
            style={styles.textField}
            value={newPitch.long_description}
            onChange={(e) => handleChange(e, "long_description")}
          />
          <TextField
            required
            id="outlined-required"
            label="Valuation"
            style={styles.textField}
            value={newPitch.company_valuation}
            type="number"
            onChange={(e) => handleChange(e, "company_valuation")}
          />
          <TextField
            required
            id="outlined-required"
            label="Equity"
            style={styles.textField}
            value={newPitch.equity}
            type="number"
            onChange={(e) => handleChange(e, "equity")}
          />
          <TextField
            required
            id="outlined-required"
            label="Progress So Far"
            style={styles.textField}
            value={newPitch.progress}
            onChange={(e) => handleChange(e, "progress")}
          />
          <TextField
            required
            id="outlined-required"
            label="Plan"
            style={styles.textField}
            value={newPitch.plan}
            onChange={(e) => handleChange(e, "plan")}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeNewPitchModal}>Cancel</Button>
        <Button onClick={onCreateClick}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
