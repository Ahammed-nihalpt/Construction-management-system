import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  addUserEndPoint,
  getDesignationEndPoint,
} from "../../../Helpers/config/axiosEndpoints";
import {
  AddProductImageValidate,
  addUserValidation,
} from "../../../Helpers/FormValidation/AddProjectValidation";
import "./CompanyAddUser.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyAddUser() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [backError, setBackError] = useState("");
  const formData = new FormData();
  const [image, setImage] = useState();
  const [viewImg, setViewImg] = useState();
  const [imgaeError, setImgaeError] = useState("");
  const [designations, setDesignations] = useState([]);

  const imageChange = (e) => {
    setViewImg(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const intialValue = {
    name: "",
    contact: "",
    email: "",
    password: "",
    designation: "",
  };

  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setImgaeError(AddProductImageValidate(image));
    const error = addUserValidation(formValues);
    setFormErrors(error);
    if (Object.keys(error).length === 0) {
      formData.append("image", image);
      formData.append("data", JSON.stringify(formValues));
      formData.append("id", localStorage.getItem("id"));
      addUserEndPoint(formData)
        .then((response) => {
          if (response.data.success) {
            navigate("/company/users");
          } else {
            setBackError(response.data.message);
            setOpen(true);
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  useEffect(() => {
    getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
      if (response.data.success) {
        const doc = response.data.designation;
        setDesignations(doc);
      }
    });
  }, []);

  return (
    <div className="add_project">
      <div className="add_form">
        <div className="form_head">Users</div>
        <div className="image"></div>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Image:</label>
            <label htmlFor="photo-upload" className="custom-file-upload ">
              <div className="img-wrap img-upload">
                {image && <img for="photo-upload" src={viewImg} alt="..." />}
                {!image && (
                  <label className="click_msage">click to select image</label>
                )}
              </div>
              <input id="photo-upload" type="file" onChange={imageChange} />
            </label>
            <div className="error_div">{imgaeError}</div>
          </div>
          <div className="row g-2 justify-content-center">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">User Name</label>
              </div>
              <div className="error_div">{formErrors.name}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact"
                  name="contact"
                  value={formValues.contact}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Contact</label>
              </div>
              <div className="error_div">{formErrors.contact}</div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  name="designation"
                  onChange={handleChange}
                >
                  <option selected>Select desgination</option>
                  {designations &&
                    designations.map((value) => (
                      <option key={value._id} value={value._id}>
                        {value.designation}
                      </option>
                    ))}
                </select>
                <label for="floatingSelect">Designation</label>
              </div>
              <div className="error_div">{formErrors.designation}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Email</label>
              </div>
              <div className="error_div">{formErrors.email}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Password</label>
              </div>
              <div className="error_div">{formErrors.password}</div>
            </div>
            <div className="col-12">
              <button type="submit" class="btn btn-primary w-100">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {backError}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CompanyAddUser;
