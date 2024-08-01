import axios from "axios";

axios.defaults.baseURL =
  // process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "/";
  process.env.NODE_ENV !== "production" ? "https://backend-foodipedia.onrender.com" : "https://backend-foodipedia.onrender.com";

