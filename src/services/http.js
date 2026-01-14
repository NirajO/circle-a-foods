import axios from "axios";

const http = axios.create({
  baseURL: "https://api.circleafoods.com/api",
});

export default http;
