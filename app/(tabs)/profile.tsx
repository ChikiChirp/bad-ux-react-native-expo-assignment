import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useFont } from "@/contexts/FontContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { currentFont, toggleFont } = useFont();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.replace("/");
      return;
    }
  }, [user, loading, router]);

  const goToTodos = () => {
    router.push("/todos");
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Text style={[styles.loadingText, { fontFamily: currentFont }]}>
          LOADING...
        </Text>
      </ThemedView>
    );
  }

  if (!user) {
    return null;
  }

  // Bad UX: Generate a fake "password" based on user email for display
  const fakePassword = user.email
    ? user.email.split("@")[0] + "123"
    : "PASSWORD123";

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Task Button */}
        <TouchableOpacity style={styles.taskFrame} onPress={goToTodos}>
          <Text style={[styles.taskText, { fontFamily: currentFont }]}>
            CLICK TO GO TO TASK
          </Text>
        </TouchableOpacity>

        {/* Change Theme Button (misleading!) */}
        <TouchableOpacity style={styles.themeFrame} onPress={toggleFont}>
          <Text style={[styles.themeText, { fontFamily: currentFont }]}>
            CHANGE THEME
          </Text>
        </TouchableOpacity>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { fontFamily: currentFont }]}>
            YOU
          </Text>
          <Text style={[styles.infoText, { fontFamily: currentFont }]}>
            YOU&apos;RE EMAIL
          </Text>
          <Text style={[styles.emailText, { fontFamily: currentFont }]}>
            {user.email?.toUpperCase()}
          </Text>
          <Text style={[styles.infoText, { fontFamily: currentFont }]}>
            YOU&apos;RE PASSWORD
          </Text>
          <Text style={[styles.passwordText, { fontFamily: currentFont }]}>
            {fakePassword.toUpperCase()}
          </Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  loadingText: {
    fontFamily: "Times New Roman",
    fontSize: 16,
    color: "#000000",
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 50,
  },
  taskFrame: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  taskText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  themeFrame: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  themeText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  infoContainer: {
    gap: 10,
  },
  infoText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  emailText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
    marginLeft: 20,
  },
  passwordText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
    marginLeft: 20,
  },
});
