import axios from "axios";

// creating an instance with base url and allwing response cookies
const axiosInstance = axios.create({
  baseURL: `${window.location.protocol === 'https:' ? `//${window.location.hostname}` : `//${window.location.hostname}:5000`}`,
  credentials: "include",
  withCredentials: true,
});

export default axiosInstance;
