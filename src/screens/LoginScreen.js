import React, {
  useContext,
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
  AuthContext,
} from "../contexts/AuthContext";

export default function LoginScreen() {
  const {
    signIn,
  } = useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

  async function handleLogin() {
    if (!email || !password) {
      showMessage(
        "Atenção",
        "Informe o e-mail e a senha."
      );

      return;
    }

    try {
      setLoading(true);

      const success =
        await signIn(
          email.trim(),
          password
        );

      if (!success) {
        showMessage(
          "Login inválido",
          "E-mail ou senha incorretos."
        );
      }

    } catch (error) {
      console.log(
        "Erro no login:",
        error
      );

      showMessage(
        "Erro",
        "Não foi possível realizar o login."
      );

    } finally {
      setLoading(false);
    }
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
          fontSize: 30,
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
          marginBottom: 20,
        }}
      >
        Acesse sua conta
      </Text>

      <Text>
        E-mail
      </Text>

      <TextInput
        placeholder="aluno@controle.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 12,
        }}
      />

      <Text>
        Senha
      </Text>

      <TextInput
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 12,
        }}
      />

      <Button
        title={
          loading
            ? "Entrando..."
            : "Entrar"
        }
        onPress={handleLogin}
        disabled={loading}
      />

      <Text
        style={{
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Login para teste:
      </Text>

      <Text
        style={{
          textAlign: "center",
        }}
      >
        aluno@controle.com
      </Text>

      <Text
        style={{
          textAlign: "center",
        }}
      >
        Senha: Controle@2026
      </Text>
    </View>
  );
}