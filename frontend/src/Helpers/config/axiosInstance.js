import axios from "axios";

const instance = axios.create({
  baseURL: "http://142.93.165.76:9000/",
  // timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
