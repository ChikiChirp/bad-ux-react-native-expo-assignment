import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import LoginForm from "@/components/LoginForm";
import { Link } from "expo-router";

export default function LoginPage() {
  return (
    <ThemedView style={styles.container}>
      <LoginForm />
      <View style={styles.linkRow}>
        <Text style={styles.prompt}>Not registered?</Text>
        <Link href="/register" style={styles.link}>
          Register
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  prompt: {
    fontSize: 16,
    color: "#888",
    marginRight: 8,
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
  link: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
});
