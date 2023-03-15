import React, { useEffect, useState } from "react";
import "./ViewAllProgress.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllProgressEndpoint,
  getLabourListEndpoint,
} from "../../Helpers/config/axiosUserEndpoins";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

function ViewAllProgress() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);
  const [data, setData] = useState([]);
  const [Labour, setLabour] = useState();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    getAllProgressEndpoint(id).then((response) => {
      if (response.data.success) {
        const datas = response.data.docs;
        console.log(response);
        setData(datas);
      }
    });
  }, [id]);

  const onLabourClick = (date) => {
    getLabourListEndpoint(id, date).then((response) => {
      if (response.data.success) {
        const datas = response.data.docs;
        setLabour(datas);
        handleOpen();
      }
    });
  };

  return (
    <div className="all_progress">
      <div className="all_progress_heading">
        <h2>Project Progress</h2>
        <button
          className="pregress_btn"
          onClick={() => {
            navigate("/user/projects/view/add/progress", { state: { id: id } });
          }}
        >
          Add Progress
        </button>
      </div>
      <div className="progress_section row">
        <div className="col-12">
          <table className="table table-striped mt-2">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Tilte</th>
                <th scope="col">Progress</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((value, key) => {
                  return (
                    <tr className="text-center" key={value._id}>
                      <th scope="row">{key + 1}</th>
                      <td>{value.date}</td>
                      <td>{value.title}</td>
                      <td>{value.progress}</td>
                      <td className="opstly">
                        <button
                          className="pregress_btn"
                          onClick={handleOpenDetails}
                        >
                          View All Details
                        </button>
                        <button
                          className="pregress_btn"
                          onClick={() => {
                            console.log("clic");
                            onLabourClick(value.date);
                          }}
                        >
                          Labour List
                        </button>
                      </td>
                      <Modal
                        open={openDetails}
                        disableEnforceFocus
                        onClose={handleCloseDetails}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div className="progress_details row w-100">
                            <div className="col-6  panda">
                              <label> Date:</label>
                              <div>{value.date}</div>
                              <label> Progress:</label>
                              <div>{value.progress}</div>
                              <label> Issues:</label>
                              <div>{value.issue}</div>
                            </div>
                            <div className="col-6 progress_options">
                              <label> Description:</label>
                              <div>{value.description}</div>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </tr>
                  );
                })}
              {!data && (
                <tr className="text-center">
                  <th colSpan={5}>No progresses yet</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        disableEnforceFocus
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <table className="table table-striped mt-2 w-100">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {Labour &&
                Labour.map((value, key) => {
                  return (
                    <tr className="text-center" key={value._id}>
                      <th scope="row">{key + 1}</th>
                      <td>
                        <img
                          style={{ width: "100px" }}
                          src={`http://localhost:9000/image/labour/${value.image}.jpg`}
                          alt=""
                        />
                      </td>
                      <td>{value.name}</td>
                      <td>{value.contact}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewAllProgress;
