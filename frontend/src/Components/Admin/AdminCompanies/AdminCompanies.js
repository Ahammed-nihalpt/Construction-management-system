import React, { useEffect, useState } from "react";
import "./AdminCompanies.css";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  blockUblockEnpoint,
  getAllCompaniesEndpoint,
} from "../../../Helpers/config/axiosAdminEndpoints";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const currencies = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Blocked",
    label: "Blocked",
  },
  {
    value: "Unblocked",
    label: "Unblocked",
  },
];
function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(true);
  const navigate = useNavigate();

  const onFilter = (e) => {
    const fil = e.target.value;
    if (fil === "Blocked") {
      const filData = searchFilter.filter(
        (value) => value.Status === "Blocked"
      );
      setStatusFilter(filData);
    } else if (fil === "Unblocked") {
      const filData = searchFilter.filter((value) => value.Status === "Active");
      setStatusFilter(filData);
    } else {
      const filData = searchFilter;
      setStatusFilter(filData);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const setRender = () => {
    if (change) {
      setChange(false);
    } else {
      setChange(true);
    }
  };
  const onSearch = (e) => {
    if (companies.length !== 0) {
      const ser = e.target.value;
      setSearch(ser);
      const filterS = companies.filter((values) => {
        return values.company_name
          .toLowerCase()
          .includes(e?.target?.value?.toLowerCase());
      });
      setSearchFilter(filterS);
    }
  };
  const handleBlockUnblock = (id) => {
    blockUblockEnpoint(id)
      .then((response) => {
        if (response.data.success) {
          setOpen(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Opps!!!",
            text: response.data.message,
          }).then(() => {
            navigate("/admin/login");
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Opps!!!",
          text: "Something went wrong",
        }).then(() => {
          navigate("/admin/login");
        });
      });
  };

  useEffect(() => {
    getAllCompaniesEndpoint()
      .then((response) => {
        console.log("hello");
        console.log(response.status + "sdf");
        if (response.data.success) {
          const data = response.data.companies;
          setCompanies(data);
          setSearchFilter(data);
          setStatusFilter(data);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/403");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="admin_companies">
      <div className="row justify-content-between gap-1 w-100">
        <h2 className="col-6">Companies</h2>
        <div className="companies_search col-6 col-md-4 mr-1">
          <i>
            <SearchIcon />
          </i>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e)}
            value={search}
          />
        </div>
      </div>
      <div className="row col-12 mt-1 w-100">
        <TextField
          id="outlined-select-currency"
          select
          label="Filter"
          defaultValue="All"
          onChange={onFilter}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="row col-12 compnies_table">
        <table className="table table-striped mt-2">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Company Id</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Status</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {statusFilter &&
              searchFilter.length !== 0 &&
              statusFilter.map((value, key) => {
                return (
                  <tr className="text-center" key={value._id}>
                    <th scope="row">{key + 1}</th>
                    <td>{value.company_name}</td>
                    <td>{value.company_id}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>{value.Status}</td>
                    <td>
                      {value.Status === "Active" && (
                        <button
                          className="access_btn_remove"
                          onClick={() => {
                            value.Status = "Blocked";
                            handleBlockUnblock(value._id);
                            setRender();
                          }}
                        >
                          Block
                        </button>
                      )}
                      {value.Status === "Blocked" && (
                        <button
                          className="access_btn_remove"
                          onClick={() => {
                            value.Status = "Active";
                            handleBlockUnblock(value._id);
                            setRender();
                          }}
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            {statusFilter.length === 0 && (
              <tr className="text-center">
                <th colSpan={7} scope="row">
                  Not Companies
                </th>
              </tr>
            )}
            {search && searchFilter.length === 0 && (
              <tr className="text-center">
                <th colSpan={7} scope="row">
                  Not Found
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Status updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminCompanies;
