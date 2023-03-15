import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "./Calendar.css";

function CalendarComponent() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div style={{ width: "300px", height: "300px" }}>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
}

export default CalendarComponent;
