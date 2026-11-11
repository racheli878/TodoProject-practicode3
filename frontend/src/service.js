import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5216";

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(response => response, error => {
  console.error('API error:',error.response?.status,error.config?.method?.toUpperCase(),error.config?.url,error.message);
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("unauthorized"));
  }
  return Promise.reject(error);
});

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    const res = await axios.post(`/items`, { name, isComplete: false })
    return res.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    const res = await axios.put(`/items/${id}?isComplete=${isComplete}`)
    return res.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    const res = await axios.delete(`/items/${id}`)
  },

  login: async (username, password) => {
    const response = await axios.post("/auth/login", { username, password });
    return response.data;
  },

  register: async (username, password) => {
    const response = await axios.post("/auth/register", { username, password });
    return response.data;
  }
};


