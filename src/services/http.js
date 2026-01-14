import axios from "axios";

const http = axios.create({
  baseURL: "https://circle-a-foods-api.onrender.com/api",
});

export default http;
