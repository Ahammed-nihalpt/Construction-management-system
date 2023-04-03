import axios from "axios";
import { Base_URL } from "../../Keys";

const instance = axios.create({
  baseURL: Base_URL,
  // timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
