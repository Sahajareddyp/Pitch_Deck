import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";

export default function NavigationBar() {
  const {
    email,
    setEmail,
    session,
    setSession,
    loggedInUser,
    setLoggedInUser,
  } = useContext(UserContext);

  const {
    openToast,
    setOpenToast,
    toastContent,
    setToastContent,
    severity,
    setSeverity,
  } = useContext(ToastContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then((response) => {
        console.log(response);
        setEmail("");
        setSession(false);
        setLoggedInUser({});
        setOpenToast(true);
        setSeverity("success");
        window.sessionStorage.removeItem("sessionKey");
        setToastContent(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pitch Deck
          </Typography>
          {!session ? (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
