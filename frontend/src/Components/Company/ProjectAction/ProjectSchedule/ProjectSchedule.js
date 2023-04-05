import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Calendar.css";
import "./ProjectSchedule.css";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Snackbar from "@mui/material/Snackbar";
import {
  addScheduleEndPoint,
  getSchedulesEndPoint,
  deleteScheduleEndPoint,
} from "../../../../Helpers/config/axiosEndpoints";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function ProjectSchedule({ id, user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [value, onChange] = useState(new Date());
  const [scheduleDocs, setSchedules] = useState({});
  const [dateSchedule, setDateSchedule] = useState([]);
  const addSchedlue = () => {
    Swal.fire({
      title: `Add schedule on Date ${value.toISOString().slice(0, 10)}`,
      input: "text",
      input2: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: (schedule) => {
        return addScheduleEndPoint(id, value, schedule)
          .then((response) => {
            console.log(response);
            if (!response.data.success) {
              throw new Error(response.statusText);
            }
            return;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  useEffect(() => {
    getSchedulesEndPoint(id).then((response) => {
      console.log(response);
      if (response.data.success) {
        const docs = response.data.docs;
        setSchedules(docs);
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps!!!",
          text: "Something went wrong",
        }).then(() => {
          navigate("/");
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectDate = (e) => {
    const edate = e;
    onChange(edate);
    console.log(scheduleDocs);
    if (Object.keys(scheduleDocs).length > 0) {
      const data = scheduleDocs.schedules.filter((value) => {
        const day1 = new Date(e).getDate();
        const month1 = new Date(e).getMonth();
        const year1 = new Date(e).getFullYear();
        const day2 = new Date(value.date).getDate();
        const month2 = new Date(value.date).getMonth();
        const year2 = new Date(value.date).getFullYear();
        return day1 === day2 && month1 === month2 && year1 === year2;
      });
      setDateSchedule(data);
    }
  };

  const onClickDelete = () => {
    deleteScheduleEndPoint(id, dateSchedule[0]._id).then((response) => {
      if (response) {
        setOpen(true);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="schedule">
      <label className="head">Project Schedules</label>
      <div className="calender_schedules row">
        <div
          className="calender_div col-md-6"
          style={{ width: "300px", height: "300px" }}
        >
          <Calendar onChange={onSelectDate} value={value} />
        </div>
        <div className="date_schedule col-md-6">
          <div className="show_schedules">
            <div className="schedules_head">
              <label>{`${value.getDate()}-${
                value.getMonth() + 1
              }-${value.getFullYear()}`}</label>
              <div>
                <label className="addicon">
                  <Tooltip title="Add" onClick={addSchedlue}>
                    <IconButton>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </label>
                <label>
                  <Tooltip title="Delete" onClick={onClickDelete}>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </label>
              </div>
            </div>
            <div className="schedules_body">
              {dateSchedule.length > 0 &&
                dateSchedule.map((value) => <label>{value.schedule}</label>)}
              {dateSchedule.length <= 0 && (
                <label>No schedule on this date</label>
              )}
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Schedule deleted successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProjectSchedule;
