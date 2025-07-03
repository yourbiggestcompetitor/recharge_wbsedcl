import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getConsumer = (id) => API.get(`/consumer/${id}`);
export const postPayment = (data) => API.post("/payment", data);
