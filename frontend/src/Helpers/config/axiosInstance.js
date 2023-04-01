import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.cpms.site:9000/",
  // timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
