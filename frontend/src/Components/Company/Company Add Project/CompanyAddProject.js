/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import "./CompanyAddProject.css";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { addProject } from "../../../Helpers/config/axiosEndpoints";
import {
  AddProjectvalidate,
  AddProductImageValidate,
} from "../../../Helpers/Form Validation/AddProjectValidation";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_API } from "../../../Keys";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyAddProject() {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  const formData = new FormData();
  const [image, setImage] = useState();
  const [viewImg, setViewImg] = useState();
  const [imgaeError, setImgaeError] = useState("");
  const imageChange = (e) => {
    setViewImg(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = useRef(null);

  function handleLocButtonClick() {
    setIsMapVisible(!isMapVisible);
    console.log("reas");
  }

  const intialValue = {
    name: "",
    duration: "",
    amount: "",
    location: "",
    startDate: "",
    endDate: "",
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
    setImgaeError(AddProductImageValidate(image));
    const errors = AddProjectvalidate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      formData.append("image", image);
      formData.append("data", JSON.stringify(formValues));
      formData.append("id", localStorage.getItem("id"));
      addProject(formData)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            navigate("/company/projects");
          } else {
            setOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (!isMapVisible) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_API;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749], // San Francisco
      zoom: 12,
    });

    const handleMapClick = (event) => {
      const { lngLat } = event;
      setSelectedLocation(lngLat);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      map.remove();
    };
  }, [isMapVisible]);

  return (
    <div className="add_project">
      {isMapVisible && (
        <div
          ref={mapContainerRef}
          style={{ height: "400px" }}
          className="map_ss"
        ></div>
      )}
      {selectedLocation && (
        <p>
          Selected location: {selectedLocation.lng}, {selectedLocation.lat}
        </p>
      )}
      <div className="add_form">
        <div className="form_head">Projects</div>
        <div className="image"></div>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Image:</label>
            <label htmlFor="photo-upload" className="custom-file-upload ">
              <div className="img-wrap img-upload">
                {image && <img for="photo-upload" src={viewImg} />}
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
                <label for="floatingInputGrid">Project Name</label>
              </div>
              <div className="error_div">{formErrors.name}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Duration"
                  name="duration"
                  value={formValues.duration}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Duration</label>
              </div>
              <div className="error_div">{formErrors.duration}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tender Amount"
                  name="amount"
                  value={formValues.amount}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Tender Amount</label>
              </div>
              <div className="error_div">{formErrors.amount}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row justify-content-start align-items-center">
                <div className="col-9">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      name="location"
                      value={formValues.location}
                      onChange={handleChange}
                    />
                    <label for="floatingInputGrid">Location</label>
                  </div>
                </div>
                <div className="col-2 locbtn" onClick={handleLocButtonClick}>
                  <LocationOnSharpIcon />
                </div>
              </div>
              <div className="error_div">{formErrors.location}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Start Date"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Start Date</label>
              </div>
              <div className="error_div">{formErrors.startDate}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  placeholder="End Date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">End Date</label>
              </div>
              <div className="error_div">{formErrors.endDate}</div>
            </div>
            <div className="col-12">
              <div class="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Project description"
                  id="floatingTextarea2"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  style={{ height: "100px" }}
                ></textarea>
                <label for="floatingTextarea2">Description</label>
              </div>
              <div className="error_div">{formErrors.description}</div>
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
          Please select a jpg or jpeg image
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CompanyAddProject;
