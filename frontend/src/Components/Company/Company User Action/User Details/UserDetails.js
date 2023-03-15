import React, { useEffect, useState } from "react";
import { getUserEndPoint } from "../../../../Helpers/config/axiosEndpoints";

function UserDetails({ id }) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    console.log(id);
    getUserEndPoint(localStorage.getItem("id")).then((response) => {
      const data = response.data.users.users;
      const filter = data.find((obj) => obj._id === id);
      setDetails(filter);
    });
  }, [id]);

  return (
    <div className="full">
      <label className="head">User Details</label>
      {details && (
        <div className="body row">
          <div className="left-body col-12 col-md-6">
            <label>Name: {details.name}</label>
            <label>Email: {details.email}</label>
            <label>Contact: {details.contact}</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
