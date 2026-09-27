import React, {
  useContext,
} from "react";

import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  AuthContext,
} from "../contexts/AuthContext";

import AuthNavigator from
  "./AuthNavigator";

import AppNavigator from
  "./AppNavigator";

export default function RootNavigator() {
  const {
    token,
    loading,
  } = useContext(AuthContext);

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
          Carregando aplicação...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {
        token
          ? <AppNavigator />
          : <AuthNavigator />
      }
    </NavigationContainer>
  );
}