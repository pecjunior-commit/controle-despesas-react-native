import axios from "axios";

export const expensesHttp = axios.create({
  baseURL: "https://6ab95f3df84897980b72911d.mockapi.io/expenses",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});