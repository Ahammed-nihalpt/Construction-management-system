import axios from "./axiosInstance";

const config = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
};

const imgConfig = {
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

export const getAllProjects = (id) =>
  axios.get(`/company/all/projects/${localStorage.getItem("id")}`, config);

export const addProject = (formdata) =>
  axios.post("/company/project/add", formdata, imgConfig);

export const getSingleProject = (id) =>
  axios.get(`/company/project/${id}`, config);

export const editProject = (formValues, id) =>
  axios.post(
    `/company/edit/project/${id}`,
    {
      formValues,
      id: id,
    },
    config
  );

export const addScheduleEndPoint = (id, date, schedule) =>
  axios.post("/company/project/schedule/add", { id, date, schedule }, config);

export const getSchedulesEndPoint = (id) =>
  axios.get(`/company/project/schedule/${id}`, config);

export const deleteScheduleEndPoint = (pid, did) =>
  axios.post("/company/project/schedule/delete", { pid, did }, config);

export const addDesignationEndPoint = (cid, designation, access) =>
  axios.post("/company/designation/add", { cid, designation, access }, config);

export const getDesignationEndPoint = (id) =>
  axios.get(`/company/designation/${id}`, config);

export const addUserEndPoint = (formdata) =>
  axios.post("/company/user/add", formdata, imgConfig);

export const getUserEndPoint = (id) =>
  axios.get(`/company/users/${id}`, config);

export const addProjectAccessToUser = (pid, uid) =>
  axios.post("/company/project/access/user", { pid, uid }, config);

export const removeUserAccesEndpoint = (pid, uid) =>
  axios.post("/company/project/access/remove", { uid, pid }, config);

export const userLoginEndPoint = (email, cmpid, password) =>
  axios.post("/user/login", { email, password, cmpid });

export const editCompanyImg = (formdata, id) =>
  axios.post(`/company/edit/pofile/${id}`, formdata, imgConfig);

export const getAllPaymentsEndpoint = (id) =>
  axios.get(`/company/all/payments/${id}`, config);

export const changePaymentStatus = (id, value) =>
  axios.post(
    "/company/change/payment/status",
    { payId: id, status: value },
    config
  );

export const getProjectPayment = (pid) =>
  axios.get(`/company/project/payment/${pid}`, config);

export const onlinePayEndpoint = (id, amount) =>
  axios.post("/company/razor/payment", { id, amount }, config);

export const verifyPaymentEndpoint = (id, payment) =>
  axios.post("/company/razor/verify/payment", { id, payment }, config);

export const getUserListEndpoint = (company_id, designation_id) =>
  axios.post("/company/get/userlist", { company_id, designation_id }, config);
