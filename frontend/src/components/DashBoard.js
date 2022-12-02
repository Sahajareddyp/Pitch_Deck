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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import NewPitch from "./NewPitch";
import PitchDetails from "./PitchDetails";
import PropTypes from "prop-types";

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
  const [investedPitch, setInvestedPitch] = React.useState([]);
  const [fullFilledPitch, setFullFilledPitch] = React.useState([]);
  const [openDetail, setOpenDetails] = React.useState(false);
  const [selectedPitch, setSelectedPitch] = React.useState(null);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const activeSession = window.sessionStorage.getItem("sessionKey");
    if (activeSession) {
      setSession(activeSession);
      getUser(activeSession);
    } else {
      navigate("/login");
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUser = (activeSession) => {
    axios
      .get(`/api/userDetails/${activeSession}`)
      .then((response) => {
        const user = response.data.data[0];
        setLoggedInUser(user);
        if (user.roleid == 2) {
          getPitchByUser(user.id);
        } else {
          getAllPitch(user.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllPitch = (userId) => {
    axios
      .get(`/api/getAllPitch/${userId}`)
      .then((response) => {
        console.log(response);
        setAllPitch(response.data.data.allPitch);
        setInvestedPitch(response.data.data.investedPitch)
        setFullFilledPitch(response.data.data.fullFilledPitch)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPitchByUser = (userId) => {
    axios
      .get(`/api/getPitchByUser/${userId}`)
      .then((response) => {
        setAllPitch(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeNewPitchModal = (event, wasDataUpdated = false) => {
    setOpenNewPitch(false);
    if (wasDataUpdated) {
      getPitchByUser(loggedInUser.id);
    }
  };

  const openNewPitchModal = () => {
    setOpenNewPitch(true);
  };

  const openPitchDetailModal = (pitch) => {
    setSelectedPitch(pitch);
    setOpenDetails(true);
  };

  const closePitchDetailModal = (e, wasDataUpdated = false) => {
    setOpenDetails(false);
    setSelectedPitch(null);
    if (wasDataUpdated) {
      getPitchByUser(loggedInUser.id);
    }
  };

  return (
    <Box>
      <NavigationBar />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Pitch" {...a11yProps(0)} />
          <Tab label="Invested Pitch" {...a11yProps(1)} />
          <Tab label="FullFilled Pitch" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Container maxWidth="lg" style={styles.containerStyle}>
          {loggedInUser.roleid != 3 && (
            <Button
              style={{ float: "right", margin: "5px" }}
              variant="contained"
              onClick={openNewPitchModal}
            >
              Create Pitch
            </Button>
          )}
          <Container maxWidth="lg" style={styles.cardContianerStyle}>
            {allPitch.map((pitch) => {
              return (
                <Card
                  sx={{ maxWidth: 150 }}
                  style={styles.cardStyle}
                  key={pitch.idea_id}
                >
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
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Container maxWidth="lg" style={styles.containerStyle}>
          <Container maxWidth="lg" style={styles.cardContianerStyle}>
            {investedPitch.map((pitch) => {
              return (
                <Card
                  sx={{ maxWidth: 150 }}
                  style={styles.cardStyle}
                  key={pitch.idea_id}
                >
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
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Container maxWidth="lg" style={styles.containerStyle}>
          <Container maxWidth="lg" style={styles.cardContianerStyle}>
            {fullFilledPitch.map((pitch) => {
              return (
                <Card
                  sx={{ maxWidth: 150 }}
                  style={styles.cardStyle}
                  key={pitch.idea_id}
                >
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
      </TabPanel>
      <NewPitch
        openNewPitch={openNewPitch}
        closeNewPitchModal={closeNewPitchModal}
      />
      <PitchDetails
        openDetail={openDetail}
        closePitchDetailModal={closePitchDetailModal}
        pitch={selectedPitch}
        userRole={loggedInUser.roleid}
      />
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
