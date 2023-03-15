import React, { useEffect, useState } from "react";
import "./ViewProgress.css";
import { useNavigate } from "react-router-dom";
import {
  getAllProgressEndpoint,
  getLabourListEndpoint,
} from "../../../../Helpers/config/axiosUserEndpoins";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

function ViewProgress({ id }) {
  const navigate = useNavigate();
  const [progress, setprogress] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [Labour, setLabour] = useState();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllProgressEndpoint(id).then((response) => {
      if (response.data.success) {
        const datas = response.data.docs;
        const currentDate = new Date();
        let closestDate = null;
        let closestDiff = Infinity;
        for (const value of datas) {
          const date = new Date(value.date);
          const diff = Math.abs(currentDate.getTime() - date.getTime());

          if (diff < closestDiff) {
            closestDate = date;
            closestDiff = diff;
          }
        }
        const finalDate = `${
          closestDate.getMonth() + 1
        }-${closestDate.getDate()}-${closestDate.getFullYear()}`;
        console.log(finalDate);
        const doc = datas.filter((value) => value.date === finalDate);
        setprogress(doc[0]);
      }
    });
  }, [id]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

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
    <div className="project_progress mb-5">
      <h2 className="head">Project Progress</h2>
      {progress && (
        <div className="last_progress">
          <label className="text1">Last Progress({progress.date}):</label>
          <div className="progress_details row w-100">
            <div className="col-6  panda">
              <label> Progress:</label>
              <div>{progress.progress}</div>
              <label> Issues:</label>
              <div>{progress.issue}</div>
            </div>
            <div className="col-6 progress_options">
              <label> Description:</label>
              <div>{progress.description}</div>
              <button
                className="pregress_btn pbtn_sm"
                onClick={() => {
                  console.log("clic");
                  onLabourClick(progress.date);
                }}
              >
                Labour list
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="pregress_btn"
        style={{ fontSize: "20px" }}
        onClick={() => {
          navigate("/user/projects/view/all/progress", {
            state: {
              id: id,
            },
          });
        }}
      >
        View All
      </button>
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

export default ViewProgress;
