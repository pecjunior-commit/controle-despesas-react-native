import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

export const AuthContext =
  createContext({});

export function AuthProvider({
  children,
}) {
  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadStoredToken() {
      try {
        const savedToken =
          await AsyncStorage.getItem(
            "@controle_despesas:token"
          );

        if (savedToken) {
          setToken(savedToken);
        }

      } catch (error) {
        console.log(
          "Erro ao carregar sessão:",
          error
        );

      } finally {
        setLoading(false);
      }
    }

    loadStoredToken();
  }, []);

  async function signIn(
    email,
    password
  ) {
    if (
      email === "aluno@controle.com" &&
      password === "Controle@2026"
    ) {
      const newToken =
        "usuario-autenticado";

      setToken(newToken);

      await AsyncStorage.setItem(
        "@controle_despesas:token",
        newToken
      );

      return true;
    }

    return false;
  }

  async function signOut() {
    setToken(null);

    await AsyncStorage.removeItem(
      "@controle_despesas:token"
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}