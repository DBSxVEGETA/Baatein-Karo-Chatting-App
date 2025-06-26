import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// adding a response interceptor to remove user info and redirect to login when the token is expired inside the cookie

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // remove user info and redirect to login when unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userInfo");
      window.alert("Session expired. Please log in again.");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
