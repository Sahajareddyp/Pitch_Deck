import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";

export default function Toast() {
  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity,
  } = useContext(ToastContext);

  const handleToastClose = () => {
    setOpenToast(false);
  };

  return (
    <Snackbar
      open={openToast}
      autoHideDuration={2000}
      onClose={handleToastClose}
    >
      <Alert
        onClose={handleToastClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {toastContent}
      </Alert>
    </Snackbar>
  );
}
