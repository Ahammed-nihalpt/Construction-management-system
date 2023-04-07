import React from "react";

function SingleSchedule({ dateSchedule }) {
  return (
    <div className="schedules_body">
      {dateSchedule.length > 0 &&
        dateSchedule.map((value) => <label>{value.schedule}</label>)}
      {dateSchedule.length <= 0 && <label>No schedule on this date</label>}
    </div>
  );
}

export default SingleSchedule;
