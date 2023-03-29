import axios from "./axiosInstance";

export const config = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};

export const imgConfig = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

export const getUserDataEndpoint = (id) =>
  axios.get(`/user/data/${id}`, config);

export const getPermissionEndpoint = (id) =>
  axios.get(`/user/permissions/${id}`, config);

export const getUserProjectsEndpoint = (id) =>
  axios.get(`/user/projects/${id}`, config);

export const getSingleProjectUserEndpoint = (id) =>
  axios.get(`/user/get/single/project/${id}`, config);

export const addProgressEndpoint = (FormData) =>
  axios.post("/user/add/progress", FormData, imgConfig);

export const getAllProgressEndpoint = (id) =>
  axios.get(`/user/get/all/progress/${id}`, config);

export const getLabourListEndpoint = (id, date) =>
  axios.get(`/user/get/labour/${id}/${date}`, config);

export const addPaymentRequestEndpoint = (value, pid, uid) =>
  axios.post("/user/payment/request", { value, pid, uid }, config);

export const getUserPaymentHistoryEndpoint = (uid) =>
  axios.get(`/user/payment/history/${uid}`, config);

export const userCancelPaymentEndpoint = (payId) =>
  axios.post("/user/cancel/payment", { payId }, config);

export const getAllChatUsers = (companyId, userId) =>
  axios.post("/chat/getuser", { companyId, userId }, config);

export const getChatDesignation = (id) =>
  axios.get(`/chat/desiganationd/${id}`, config);

export const getChatHistoryUser = (sender, receiver) =>
  axios.post("/chat/history", { sender, receiver }, config);

export const clearUnreadUser = (sender, receiver) =>
  axios.post("/chat/clear/unread", { sender, receiver }, config);
