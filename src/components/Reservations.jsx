import { Box, IconButton, Typography, TablePagination } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function Reservations() {
  const [reservations, setReservations] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://54.159.171.255:8800/api/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = async (reservationId) => {
    try {
      await axios.put(`http://54.159.171.255:8800/api/reservations/${reservationId}/cancel`);
      setReservations(
        reservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, reservationStatus: "Canceled" }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h2" textAlign="center" mb={3}>
        Reservations
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#CECFDA" }}>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Id</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Finish Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>User</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Parking Spot</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reservation) => (
                <TableRow key={reservation._id} sx={{ "&:last-child td": { width: 130 } }}>
                  <TableCell component="th" scope="row">{reservation._id}</TableCell>
                  <TableCell>{reservation.startDate}</TableCell>
                  <TableCell>{reservation.finishDate}</TableCell>
                  <TableCell>{reservation.user}</TableCell>
                  <TableCell>{reservation.parkingSpot ? reservation.parkingSpot.name : ""}</TableCell>
                  <TableCell>{reservation.reservationStatus}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => handleCancelReservation(reservation._id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={reservations.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
