import { expensesHttp } from "./api";

export async function createExpense(expense) {
  const { data } = await expensesHttp.post("", expense);

  return data;
}

export async function listExpenses() {
  const { data } = await expensesHttp.get("");

  return data;
}

export async function deleteExpense(id) {
  await expensesHttp.delete(`/${id}`);
}

export async function updateExpense(id, expense) {
  const { data } = await expensesHttp.put(`/${id}`, expense);

  return data;
}