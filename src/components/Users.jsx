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

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [editUser, setEditUser] = React.useState({
    _id: "",
    fullname: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://54.158.208.20:8800/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error ", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete("http://54.158.208.20:8800/api/users/" + userId);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewUser({ fullname: "", email: "", password: "" });
    setOpenAdd(false);
  };

  const handleOpenEdit = (user) => {
    setEditUser(user);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleChangeNewUser = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEditUser = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async () => {
    try {
      await axios.post("http://54.158.208.20:8800/api/auth/register", newUser);
      fetchUsers();
      handleCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `http://54.158.208.20:8800/api/users/${editUser._id}`,
        editUser
      );
      fetchUsers();
      handleCloseEdit();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h2" textAlign="center" mb={3}>
        Users
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
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#CECFDA" }}>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Full name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Role
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td": { width: 130 } }}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.fullname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.role}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => handleOpenEdit(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => deleteUser(user._id)}
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
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="add-user-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Add User
          </Typography>
          <TextField
            label="Full Name"
            name="fullname"
            value={newUser.fullname}
            onChange={handleChangeNewUser}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleChangeNewUser}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChangeNewUser}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={addUser}
              variant="contained"
              sx={{
                backgroundColor: "#CEC9F2",
                "&:hover": {
                  backgroundColor: "#9C8ADE",
                },
              }}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="edit-user-modal-title"
        aria-describedby="edit-user-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="edit-user-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Edit User
          </Typography>
          <TextField
            label="Full Name"
            name="fullname"
            value={editUser.fullname}
            onChange={handleChangeEditUser}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editUser.email}
            onChange={handleChangeEditUser}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={editUser.password}
            onChange={handleChangeEditUser}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={updateUser}
              variant="contained"
              sx={{
                backgroundColor: "#CEC9F2",
                "&:hover": {
                  backgroundColor: "#9C8ADE",
                },
              }}
            >
              Update User
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
