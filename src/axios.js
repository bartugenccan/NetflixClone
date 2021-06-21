import axios from "axios";

const axiosData = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default axiosData;
