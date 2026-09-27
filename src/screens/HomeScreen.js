import React, {
  useCallback,
  useContext,
  useState,
} from "react";

import {
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import {
  AuthContext,
} from "../contexts/AuthContext";

import {
  listExpenses,
} from "../services/expensesApi";

export default function HomeScreen({
  navigation,
}) {
  const {
    signOut,
  } = useContext(AuthContext);

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function loadSummary() {
    try {
      setLoading(true);

      const data =
        await listExpenses();

      setExpenses(data);

    } catch (error) {
      console.log(
        "Erro ao carregar resumo:",
        error
      );

    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadSummary();
    }, [])
  );

  const totalExpenses =
    expenses.reduce(
      (sum, item) =>
        sum + Number(item.valor),
      0
    );

  const expenseCount =
    expenses.length;

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
          Carregando resumo...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        gap: 15,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Controle de Despesas
      </Text>

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Bem-vindo ao seu controle financeiro
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Total geral
        </Text>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          R$ {totalExpenses.toFixed(2)}
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Quantidade de despesas
        </Text>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          {expenseCount}
        </Text>
      </View>

      <Button
        title="Ver Despesas"
        onPress={() =>
          navigation.navigate(
            "ExpensesList"
          )
        }
      />

      <Button
        title="Nova Despesa"
        onPress={() =>
          navigation.navigate(
            "ExpenseForm"
          )
        }
      />

      <Button
        title="Sair"
        color="red"
        onPress={signOut}
      />
    </View>
  );
}