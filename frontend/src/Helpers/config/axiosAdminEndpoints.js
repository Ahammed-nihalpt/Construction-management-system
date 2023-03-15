import axios from "./axiosInstance";

export const config = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};

export const adminLoginEndpoint = (id, password) =>
  axios.post("/admin/login", { id, password });

export const getAllCompaniesEndpoint = () =>
  axios.get("/admin/all/companies", config);

export const blockUblockEnpoint = (id) =>
  axios.get(`/admin/change/company/status/${id}`, config);
