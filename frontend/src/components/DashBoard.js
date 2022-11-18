import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import NavigationBar from "./common/NavigationBar";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import NewPitch from "./NewPitch";
import PitchDetails from "./PitchDetails";

export default function Dashboard() {
  const styles = {
    containerStyle: {
      border: "1px solid blue",
      margin: "10px",
    },
    cardStyle: {
      margin: "10px",
      border: "1px solid blue",
    },
    cardContianerStyle: {
      display: "flex",
      justifyContext: "space-between",
    },
  };

  const {
    email,
    setEmail,
    session,
    setSession,
    loggedInUser,
    setLoggedInUser,
  } = React.useContext(UserContext);
  const navigate = useNavigate();

  const [openNewPitch, setOpenNewPitch] = React.useState(false);
  const [allPitch, setAllPitch] = React.useState([]);
  const [openDetail, setOpenDetails] = React.useState(false);
  const [selectedPitch, setSelectedPitch] = React.useState(null);

  React.useEffect(() => {
    if (session) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  const getUser = () => {
    axios
      .get(`/api/userDetails/${email}/${session}`)
      .then((response) => {
        console.log(response);
        setLoggedInUser(response.data.data[0]);
        getAllPitch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllPitch = () => {
    axios
      .get("/api/getAllPitch")
      .then((response) => {
        setAllPitch(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeNewPitchModal = () => {
    setOpenNewPitch(false);
  };

  const openNewPitchModal = () => {
    setOpenNewPitch(true);
  };

  const openPitchDetailModal = (pitch) => {
    setSelectedPitch(pitch);
    setOpenDetails(true);
  };

  const closePitchDetailModal = () => {
    setOpenDetails(false);
    setSelectedPitch(null);
  };
  return (
    <Box>
      <NavigationBar />
      <Container maxWidth="lg" style={styles.containerStyle}>
        <Button variant="contained" onClick={openNewPitchModal}>
          New Idea
        </Button>
        <Container maxWidth="lg" style={styles.cardContianerStyle}>
          {allPitch.map((pitch) => {
            return (
              <Card sx={{ maxWidth: 150 }} style={styles.cardStyle}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {pitch.idea_name}
                  </Typography>

                  <Typography variant="body2">
                    {pitch.short_description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => openPitchDetailModal(pitch)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Container>
      </Container>
      <NewPitch
        openNewPitch={openNewPitch}
        closeNewPitchModal={closeNewPitchModal}
      />
      <PitchDetails
        openDetail={openDetail}
        closePitchDetailModal={closePitchDetailModal}
        pitch={selectedPitch}
      />
    </Box>
  );
}
