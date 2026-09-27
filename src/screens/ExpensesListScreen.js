import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import {
  Picker,
} from "@react-native-picker/picker";

import {
  listExpenses,
  deleteExpense,
} from "../services/expensesApi";

import ExpenseItem from "../components/ExpenseItem";

export default function ExpensesListScreen({
  navigation,
}) {
  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [categoryFilter, setCategoryFilter] =
    useState("Todas");

  async function loadExpenses() {
    try {
      setLoading(true);

      const data =
        await listExpenses();

      setExpenses(data);

    } catch (error) {
      console.log(
        "Erro ao carregar despesas:",
        error
      );

    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  function handleEdit(expense) {
    navigation.navigate(
      "ExpenseForm",
      {
        expense: expense,
      }
    );
  }

  async function removeExpense(expense) {
    try {
      await deleteExpense(
        expense.id
      );

      setExpenses(
        (previousExpenses) =>
          previousExpenses.filter(
            (item) =>
              item.id !== expense.id
          )
      );

    } catch (error) {
      console.log(
        "Erro ao excluir:",
        error
      );

      if (Platform.OS === "web") {
        window.alert(
          "Não foi possível excluir a despesa."
        );

      } else {
        Alert.alert(
          "Erro",
          "Não foi possível excluir a despesa."
        );
      }
    }
  }

  function handleDelete(expense) {
    if (Platform.OS === "web") {
      const confirmou =
        window.confirm(
          `Deseja excluir "${expense.descricao}"?`
        );

      if (confirmou) {
        removeExpense(expense);
      }

      return;
    }

    Alert.alert(
      "Excluir despesa",
      `Deseja excluir "${expense.descricao}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            removeExpense(expense),
        },
      ]
    );
  }

  const categories = [
    "Todas",
    ...Array.from(
      new Set(
        expenses.map(
          (item) => item.categoria
        )
      )
    ),
  ];

  const filteredExpenses =
    categoryFilter === "Todas"
      ? expenses
      : expenses.filter(
          (item) =>
            item.categoria ===
            categoryFilter
        );

  const totalExpenses =
    filteredExpenses.reduce(
      (sum, item) =>
        sum + Number(item.valor),
      0
    );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />

        <Text>
          Carregando despesas...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Minhas Despesas
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Total: R$ {totalExpenses.toFixed(2)}
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Filtrar por categoria
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(value) =>
            setCategoryFilter(value)
          }
        >
          {categories.map(
            (category) => (
              <Picker.Item
                key={category}
                label={category}
                value={category}
              />
            )
          )}
        </Picker>
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <Text>
            Nenhuma despesa encontrada.
          </Text>
        }
      />
    </View>
  );
}