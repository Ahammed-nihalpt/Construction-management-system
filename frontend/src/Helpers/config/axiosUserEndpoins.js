import axios from "./axiosInstance";

export const imgConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const getUserDataEndpoint = (id) => axios.get(`/user/data/${id}`);

export const getPermissionEndpoint = (id) =>
  axios.get(`/user/permissions/${id}`);

export const getUserProjectsEndpoint = (id) =>
  axios.get(`/user/projects/${id}`);

export const getSingleProjectUserEndpoint = (id) =>
  axios.get(`/user/get/single/project/${id}`);

export const addProgressEndpoint = (FormData) =>
  axios.post("/user/add/progress", FormData, imgConfig);

export const getAllProgressEndpoint = (id) =>
  axios.get(`/user/get/all/progress/${id}`);

export const getLabourListEndpoint = (id, date) =>
  axios.get(`/user/get/labour/${id}/${date}`);

export const addPaymentRequestEndpoint = (value, pid, uid) =>
  axios.post("/user/payment/request", { value, pid, uid });

export const getUserPaymentHistoryEndpoint = (uid) =>
  axios.get(`/user/payment/history/${uid}`);

export const userCancelPaymentEndpoint = (payId) =>
  axios.post("/user/cancel/payment", { payId });
