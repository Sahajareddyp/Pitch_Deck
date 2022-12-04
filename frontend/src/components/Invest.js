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
import { ToastContext } from "../contexts/ToastContext";
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
  const [isAcceptDisabled, setIsAcceptDisabled] = useState(false);

  const styles = {
    textField: {
      margin: "10px",
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
    textfieldStyle: {
      borderColor: "#5DFFED",
    },
    buttonStyle: {
      backgroundColor: "#5DFFED",
      color: "#18171B",
    },
  };

  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity,
  } = useContext(ToastContext);

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
          setIsAcceptDisabled(true);
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
    axios
      .post("/api/createInvestment", reqBody)
      .then((response) => {
        setOpenToast(true);
        setSeverity("success");
        setToastContent(response.data.message);
        props.closeInvestModal(true);
      })
      .catch((err) => {
        setOpenToast(true);
        setSeverity("error");
        setToastContent(err.response.data.message);
        props.closeInvestModal();
      });
  };
  return (
    <Dialog
      open={props.openInvestModal}
      onClose={props.closeInvestModal}
      PaperProps={{ style: styles.dialogStyle }}
    >
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
            sx={{
              fieldset: styles.textfieldStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Additional Comments"
            style={styles.textField}
            value={investDetails.comment}
            onChange={(e) => handleChange(e, "comment")}
            sx={{
              fieldset: styles.textfieldStyle,
              input: styles.textfieldColor,
            }}
            InputLabelProps={{
              style: styles.textfieldColor,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {!isAcceptDisabled && (
          <Button
            style={styles.buttonStyle}
            disabled={isAcceptDisabled}
            onClick={createInvestment}
          >
            Invest
          </Button>
        )}
        <Button style={styles.buttonStyle} onClick={props.closeInvestModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
