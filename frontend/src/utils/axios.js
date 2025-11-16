import axios from "axios";
const BaseUrl = import.meta.env.NODE_ENV=="development" ?"http://localhost:5000/api":"/api"
const api = axios.create({
    baseURL:BaseUrl,
})
export default api