import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.236.179.226:9000/",
  // timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
