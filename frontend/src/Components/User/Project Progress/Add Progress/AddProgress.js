import React, { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddProgress.css";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Webcam from "react-webcam";
import { validateProgress } from "../../../../Helpers/Form Validation/ProgressValidation";
import Swal from "sweetalert2";
import { addProgressEndpoint } from "../../../../Helpers/config/axiosUserEndpoins";

function AddProgress() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formData = new FormData();
  const [lName, setLName] = useState("");
  const [lContact, setLContacts] = useState("");
  const [permissionStatus, setPermissionStatus] = useState("prompt");
  const [labourList, setLabourList] = useState([]);
  const intialValue = {
    title: "",
    progress: "",
    issue: "",
    description: "",
  };
  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateProgress(formValues);
    setFormErrors(err);

    if (Object.keys(err).length === 0) {
      if (labourList.length <= 0) {
        Swal.fire({
          icon: "error",
          title: "Labour list is required",
          text: "Labour list is empty",
        });
      } else {
        formData.append("progressData", JSON.stringify(formValues));
        formData.append("size", labourList.length);
        formData.append("id", state.id);
        formData.append("labour", JSON.stringify(labourList));
        formData.append("userId", `${localStorage.getItem("id")}`);
        addProgressEndpoint(formData).then((response) => {
          if (response.data.success) {
            navigate("/user/projects/view/all/progress", {
              state: {
                id: state.id,
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Progress already add for the day",
              text: response.data.message,
            });
          }
        });
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const addToList = () => {
    setLabourList([
      ...labourList,
      {
        image: screenshot,
        name: lName,
        contact: lContact,
      },
    ]);
    setScreenshot(null);
    setLName("");
    setLContacts("");
  };

  const requestPermission = async () => {
    try {
      if (permissionStatus === "prompt" || permissionStatus === "granted") {
        console.log("called");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const state = "granted";
        setPermissionStatus(state);
        stream.getTracks().forEach((track) => track.stop());
        if (state === "granted") {
          handleOpen();
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Camera access is ${permissionStatus}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      setPermissionStatus("denied");
    }
  };
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div className="row Add_progress_main mt-5">
      <div className="add_progress_form col-12">
        <h4 style={{ alignSelf: "center" }}>Progress details</h4>
        <div className="row p-3 offset-1">
          <form className="row justify-content-center">
            <div className="col-4 mb-1">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                />
                <label>Title</label>
              </div>
              <div className="error_div">{formErrors.title}</div>
            </div>
            <div className="col-4 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Progress"
                  name="progress"
                  value={formValues.progress}
                  onChange={handleChange}
                />
                <label>Progress</label>
              </div>
              <div className="error_div">{formErrors.progress}</div>
            </div>
            <div className="col-4 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Issue"
                  name="issue"
                  value={formValues.issue}
                  onChange={handleChange}
                />
                <label>Issue (If any)</label>
              </div>
              <div className="error_div">{formErrors.issue}</div>
            </div>
            <div className="col-6 mb-3">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="error_div">{formErrors.description}</div>
            </div>
          </form>
        </div>
      </div>
      <div className="add_progress_labour col-12">
        <h4 style={{ alignSelf: "center" }}>Labour list</h4>
        <div>
          <table className="table table-striped mt-2">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              {labourList.length > 0 &&
                labourList.map((value, key) => (
                  <tr className="text-center" key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>
                      <img className="temp_image" src={value.image} alt="" />
                    </td>
                    <td>{value.name}</td>
                    <td>{value.contact}</td>

                    <td>
                      <button className="pregress_btn">Remove</button>
                    </td>
                  </tr>
                ))}

              <tr className="text-center">
                <th scope="row">{labourList.length + 1}</th>
                <td>
                  {!screenshot && (
                    <button
                      className="pregress_btn"
                      onClick={requestPermission}
                    >
                      Take Photo
                    </button>
                  )}
                  {screenshot && (
                    <img className="temp_image" src={screenshot} alt="" />
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="lname"
                    value={lName}
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="lcontact"
                    value={lContact}
                    onChange={(e) => {
                      setLContacts(e.target.value);
                    }}
                  />
                </td>

                <td>
                  <button className="pregress_btn" onClick={addToList}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="submit_progress col-12">
        <button className="pregress_btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Modal
        open={open}
        disableEnforceFocus
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={"100%"}
            height={"100%"}
            videoConstraints={videoConstraints}
          />
          <div className="photo_btn">
            <button className="pregress_btn" onClick={capture}>
              Capture photo
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProgress;
