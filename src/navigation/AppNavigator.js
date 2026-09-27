import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ExpensesListScreen from "../screens/ExpensesListScreen";
import ExpenseFormScreen from "../screens/ExpenseFormScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Controle de Despesas" }}
      />

      <Stack.Screen
        name="ExpensesList"
        component={ExpensesListScreen}
        options={{ title: "Despesas" }}
      />

      <Stack.Screen
        name="ExpenseForm"
        component={ExpenseFormScreen}
        options={{ title: "Nova Despesa" }}
      />
    </Stack.Navigator>
  );
}