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

export default function Invest(props) {
  const {
    email,
    setEmail,
    session,
    setSession,
    loggedInUser,
    setLoggedInUser,
  } = useContext(UserContext);

  const [investDetails, setInvestDetails] = useState({
    investorId: loggedInUser.id,
    ideaId: props.pitch.idea_id,
    count: "0",
    comment: "",
  });

  const styles = {
    textField: {
      margin: "10px",
      width: "90%",
    },
  };

  useEffect(() => {
    axios
      .get(
        `/api/getInvestmentDetails/${props.pitch.idea_id}/${loggedInUser.id}`
      )
      .then((response) => {
        if (response.data.isDetailsPresent) {
          const details = response.data.details;
          setInvestDetails({
            ...investDetails,
            count: parseInt(details.count),
            comment: details.comment,
          });
        }
      });
  }, []);

  const handleChange = (event, property) => {
    setInvestDetails({ ...investDetails, [property]: event.target.value });
  };

  const createInvestment = () => {
    const reqBody = {
      newInvestment: investDetails,
    };
    axios.post("/api/createInvestment", reqBody).then((response) => {
      console.log(response);
    });
  };
  return (
    <Dialog open={props.openInvestModal} onClose={props.closeInvestModal}>
      <DialogTitle>Invest</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            required
            id="outlined-required"
            label="Number of other investors you want to be interested?"
            style={styles.textField}
            value={investDetails.count}
            type="number"
            onChange={(e) => handleChange(e, "count")}
          />
          <TextField
            required
            id="outlined-required"
            label="Additional Comments"
            style={styles.textField}
            value={investDetails.comment}
            onChange={(e) => handleChange(e, "comment")}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={createInvestment}>Invest</Button>
        <Button onClick={props.closeInvestModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
