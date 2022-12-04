import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

export default function View() {
  const [interested, setInterested] = useState([]);
  const [fulfilled, setFullFilled] = useState([]);

  useEffect(() => {
    axios.get("/api/getInterestAndFullFilled").then((response) => {
      console.log(response);
      setInterested(response.data.interest);
      setFullFilled(response.data.fullfilled);
    });
  });
  return (
    <Box>
      <Container maxWidth="lg">
        <Typography variant="h2">Interested Ideas</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Investor</TableCell>
                <TableCell align="right">Idea</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interested.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.investorId}</TableCell>
                  <TableCell align="right">{row.ideaId}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <br/><br/>
      <Container maxWidth="lg">
        <Typography variant="h2">FullFilled Ideas</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Investor</TableCell>
                <TableCell align="right">Idea_ID</TableCell>
                <TableCell align="right">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fulfilled.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.investorId}</TableCell>
                  <TableCell align="right">{row.ideaId}</TableCell>
                  <TableCell align="right">{row.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
