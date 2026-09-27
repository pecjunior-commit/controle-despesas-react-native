import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
} from "react-native";

import {
  createExpense,
  updateExpense,
} from "../services/expensesApi";

export default function ExpenseFormScreen({
  route,
  navigation,
}) {
  const [descricao, setDescricao] =
    useState("");

  const [valor, setValor] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const expenseToEdit =
    route.params?.expense;

  useEffect(() => {
    if (expenseToEdit) {
      setDescricao(
        expenseToEdit.descricao
      );

      setValor(
        String(expenseToEdit.valor)
      );

      setCategoria(
        expenseToEdit.categoria
      );
    }
  }, [expenseToEdit]);

  useEffect(() => {
    navigation.setOptions({
      title: expenseToEdit
        ? "Editar Despesa"
        : "Nova Despesa",
    });
  }, [
    navigation,
    expenseToEdit,
  ]);

  function showMessage(
    titulo,
    mensagem
  ) {
    if (Platform.OS === "web") {
      window.alert(
        `${titulo}\n${mensagem}`
      );

    } else {
      Alert.alert(
        titulo,
        mensagem
      );
    }
  }

  async function handleSave() {
    if (
      !descricao ||
      !valor ||
      !categoria
    ) {
      showMessage(
        "Atenção",
        "Preencha todos os campos."
      );

      return;
    }

    try {
      const dadosDespesa = {
        descricao: descricao,
        valor: Number(valor),
        categoria: categoria,
        data:
          new Date()
            .toLocaleDateString(
              "pt-BR"
            ),
      };

      if (expenseToEdit) {
        await updateExpense(
          expenseToEdit.id,
          dadosDespesa
        );

        showMessage(
          "Sucesso",
          "Despesa atualizada com sucesso!"
        );

        navigation.goBack();

      } else {
        await createExpense(
          dadosDespesa
        );

        showMessage(
          "Sucesso",
          "Despesa cadastrada com sucesso!"
        );

        setDescricao("");
        setValor("");
        setCategoria("");

        navigation.popToTop();
      }

    } catch (error) {
      console.log(
        "Erro ao salvar despesa:",
        error
      );

      showMessage(
        "Erro",
        "Não foi possível salvar a despesa."
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        gap: 15,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        {
          expenseToEdit
            ? "Editar Despesa"
            : "Nova Despesa"
        }
      </Text>

      <Text>
        Descrição
      </Text>

      <TextInput
        placeholder="Ex.: Supermercado"
        value={descricao}
        onChangeText={setDescricao}
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 12,
        }}
      />

      <Text>
        Valor
      </Text>

      <TextInput
        placeholder="Ex.: 180"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 12,
        }}
      />

      <Text>
        Categoria
      </Text>

      <TextInput
        placeholder="Ex.: Alimentação"
        value={categoria}
        onChangeText={setCategoria}
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 12,
        }}
      />

      <Button
        title={
          expenseToEdit
            ? "Salvar Alterações"
            : "Salvar Despesa"
        }
        onPress={handleSave}
      />
    </View>
  );
}