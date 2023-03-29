import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./AddUserAccess.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  addProjectAccessToUser,
  getDesignationEndPoint,
  getSingleProject,
  getUserEndPoint,
  removeUserAccesEndpoint,
} from "../../../../Helpers/config/axiosEndpoints";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#282D35",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#282D35",
    color: theme.palette.common.white,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

function AddUserAccess({ id }) {
  const [selectUser, setSelectUser] = useState(false);
  const [values, setValues] = useState("");
  const [remove, setRemove] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [users, setUsers] = useState([]);
  const onAddClick = () => {
    addProjectAccessToUser(id, values._id).then((response) => {
      if (response.data.success) {
        setSelectUser(false);
      }
    });
  };

  const removeAccessClick = (uid) => {
    removeUserAccesEndpoint(id, uid).then((response) => {
      if (response.data.success) {
        if (remove) {
          setRemove(false);
        } else {
          setRemove(true);
        }
      }
    });
  };

  useEffect(() => {
    getSingleProject(id).then((response) => {
      const projectData = response.data.data.access;
      getUserEndPoint(localStorage.getItem("id")).then((response) => {
        const userData = response.data.users.users;
        setUsers(userData);
        const accessUser = userData.filter((obj) =>
          projectData.includes(obj._id)
        );
        setUsersList(accessUser);
      });
    });
    getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
      if (response.data.success) {
        const data = response.data.designation;
        setDesignation(data);
      }
    });
  }, [id, selectUser, remove]);
  return (
    <div className="access_table">
      {selectUser && (
        <Modal
          open={selectUser}
          onClose={() => {
            setSelectUser(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select User
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                sx={{ width: "100%" }}
                onChange={(e, value) => {
                  setValues(value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Users" />
                )}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <button className="access_btn" onClick={onAddClick}>
                Add
              </button>
            </Typography>
          </Box>
        </Modal>
      )}
      <div className="head">
        <h2>Users with Project Access</h2>
      </div>
      <div style={{ width: "100%", marginBottom: "5px", padding: "10px" }}>
        <div>
          <button
            className="access_btn"
            onClick={() => {
              setSelectUser(true);
            }}
          >
            Add User Access
          </button>
        </div>
      </div>
      <TableContainer className="tset">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Option</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList &&
              usersList.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {designation &&
                      designation.find((item) => {
                        return item._id === row.designation_id;
                      })?.designation}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      className="access_btn_remove"
                      onClick={() => removeAccessClick(row._id)}
                    >
                      Remove
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AddUserAccess;
