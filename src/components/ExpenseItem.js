import React from "react";

import {
  View,
  Text,
  Button,
} from "react-native";

export default function ExpenseItem({
  expense,
  onEdit,
  onDelete,
}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {expense.descricao}
      </Text>

      <Text>
        Categoria: {expense.categoria}
      </Text>

      <Text>
        Data: {expense.data}
      </Text>

      <Text
        style={{
          marginTop: 5,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        R$ {Number(expense.valor).toFixed(2)}
      </Text>

      <View
        style={{
          marginTop: 10,
          gap: 8,
        }}
      >
        <Button
          title="Editar"
          onPress={() => onEdit(expense)}
        />

        <Button
          title="Excluir"
          color="red"
          onPress={() => onDelete(expense)}
        />
      </View>
    </View>
  );
}