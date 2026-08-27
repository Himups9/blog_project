import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:5001/api";

const api = axios.create({
    baseURL: API_BASE_URL,

    headers: {
        Accept: "application/json",
    },

    withCredentials: true,

    timeout: 10000,
});

export default api;