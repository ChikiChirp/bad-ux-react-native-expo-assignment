import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import RegisterForm from "@/components/RegisterForm";
import { Link, useRouter } from "expo-router";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegistered = () => {
    router.push("/onboarding");
  };

  return (
    <ThemedView style={styles.container}>
      <RegisterForm onRegistered={handleRegistered} />
      <View style={styles.linkRow}>
        <Link href="/" style={styles.link}>
          Back to Login
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
  link: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
});
