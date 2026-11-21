import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLeads = async (params = {}) => {
  const response = await API.get("/leads", { params });
  const data = response.data;

  return data.leads || data.data || data;
};

export const getStats = async () => {
  const response = await API.get("/leads/stats");
  const data = response.data;

  return data.stats || data.data || data;
};

export const createLead = async (lead) => {
  const response = await API.post("/leads", lead);
  return response.data;
};

export const updateLead = async (id, lead) => {
  const response = await API.put(`/leads/${id}`, lead);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await API.delete(`/leads/${id}`);
  return response.data;
};