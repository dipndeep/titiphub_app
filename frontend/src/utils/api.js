import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor: attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("titiphub_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear auth data
      localStorage.removeItem("titiphub_token")
      localStorage.removeItem("titiphub_user")

      // Only redirect if not already on auth pages
      const currentPath = window.location.pathname
      if (currentPath !== "/signin" && currentPath !== "/signup" && currentPath !== "/") {
        window.location.href = "/signin"
      }
    }
    return Promise.reject(error)
  }
)

export default api
