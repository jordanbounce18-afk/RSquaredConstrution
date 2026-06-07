import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const createEstimate = (payload) => apiClient.post("/estimates", payload).then((r) => r.data);
export const listEstimates = () => apiClient.get("/estimates").then((r) => r.data);
export const updateEstimateStatus = (id, status) =>
  apiClient.patch(`/estimates/${id}`, { status }).then((r) => r.data);
export const deleteEstimate = (id) => apiClient.delete(`/estimates/${id}`).then((r) => r.data);
export const estimatesSummary = () => apiClient.get("/estimates/stats/summary").then((r) => r.data);
