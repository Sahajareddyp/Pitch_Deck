import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import NavigationBar from "./common/NavigationBar";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const {
        email,
        setEmail,
        session,
        setSession,
        loggedInUser,
        setLoggedInUser,
      } = React.useContext(UserContext);
    const navigate = useNavigate();

  React.useEffect(() => {
    if(session){
        getUser();
    } else {
        navigate('/login');
    }
  }, []);

  const getUser = () => {
    axios
      .get(`/api/userDetails/${email}/${session}`)
      .then((response) => {
        console.log(response);
        setLoggedInUser(response.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <NavigationBar />
      Home
    </Box>
  );
}
