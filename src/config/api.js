// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const apiClient = axios.create({
//   baseURL: BASE_URL,
// });
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Tambahkan token di setiap request secara otomatis
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
