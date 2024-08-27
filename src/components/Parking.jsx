import {
    Box,
    IconButton,
    Typography,
    Button,
    TextField,
    Modal,
  } from "@mui/material";
  import * as React from "react";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import axios from "axios";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  export default function Parkings() {
    const [parkings, setParkings] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [newParking, setNewParking] = React.useState({
      name: "",
      description: "",
      longitude: "",
      latitude: "",
    });
    const [editParking, setEditParking] = React.useState({
      _id: "",
      name: "",
      description: "",
      longitude: "",
      latitude: "",
    });
  
    const fetchParkings = async () => {
      try {
        const response = await axios.get("http://54.158.208.20:8800/api/parks");
        setParkings(response.data);
      } catch (error) {
        console.error("There was an error ", error);
      }
    };
  
    const deleteParkings = async (parkingId) => {
      try {
        await axios.delete(`http://54.158.208.20:8800/api/parks/${parkingId}`);
        fetchParkings();
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => {
      setNewParking({
        name: "",
        description: "",
        longitude: "",
        latitude: "",
      });
      setOpenAdd(false);
    };
  
    const handleOpenEdit = (parking) => {
      setEditParking(parking);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setEditParking({
        _id: "",
        name: "",
        description: "",
        longitude: "",
        latitude: "",
      });
      setOpenEdit(false);
    };
  
    const handleChangeNewParking = (e) => {
      setNewParking({
        ...newParking,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleChangeEditParking = (e) => {
      setEditParking({
        ...editParking,
        [e.target.name]: e.target.value,
      });
    };
  
    const addParking = async () => {
      try {
        await axios.post("http://54.158.208.20:8800/api/parks", newParking);
        fetchParkings();
        handleCloseAdd();
      } catch (error) {
        console.log(error);
      }
    };
  
    const updateParking = async () => {
      try {
        await axios.put(`http://54.158.208.20:8800/api/parks/${editParking._id}`, editParking);
        fetchParkings();
        handleCloseEdit();
      } catch (error) {
        console.log(error);
      }
    };
  
    React.useEffect(() => {
      fetchParkings();
    }, []);
  
    return (
      <Box>
        <Typography variant="h2" textAlign="center" mb={3}>
          Parkings
        </Typography>
  
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            onClick={handleOpenAdd}
            sx={{
              backgroundColor: "#CEC9F2",
              "&:hover": {
                backgroundColor: "#9C8ADE",
              },
            }}
          >
            Add Parking 
          </Button>
        </Box>
  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#CECFDA" }}>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Longitude
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                  Latitude
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parkings?.map((parking) => (
                <TableRow
                  key={parking._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {parking.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parking.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parking.longitude}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parking.latitude}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleOpenEdit(parking)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => deleteParkings(parking._id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="add-parking-modal-title"
          aria-describedby="add-parking-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="add-parking-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Add Parking
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={newParking.name}
              onChange={handleChangeNewParking}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={newParking.description}
              onChange={handleChangeNewParking}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Longitude"
              name="longitude"
              value={newParking.longitude}
              onChange={handleChangeNewParking}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Latitude"
              name="latitude"
              value={newParking.latitude}
              onChange={handleChangeNewParking}
              fullWidth
              margin="normal"
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                onClick={addParking}
                variant="contained"
                sx={{
                  backgroundColor: "#CEC9F2",
                  "&:hover": {
                    backgroundColor: "#9C8ADE",
                  },
                }}
              >
                Add Parking
              </Button>
            </Box>
          </Box>
        </Modal>
  
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="edit-parking-modal-title"
          aria-describedby="edit-parking-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="edit-parking-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              Edit Parking
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={editParking.name}
              onChange={handleChangeEditParking}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={editParking.description}
              onChange={handleChangeEditParking}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Longitude"
              name="longitude"
              value={editParking.longitude}
              onChange={handleChangeEditParking}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Latitude"
              name="latitude"
              value={editParking.latitude}
              onChange={handleChangeEditParking}
              fullWidth
              margin="normal"
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                onClick={updateParking}
                variant="contained"
                sx={{
                  backgroundColor: "#CEC9F2",
                  "&:hover": {
                    backgroundColor: "#9C8ADE",
                  },
                }}
              >
                Update Parking
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  }
  