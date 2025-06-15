import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNoClick = async () => {
    // Bad UX: If user doesn't understand, kick them out completely!
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleYesClick = () => {
    // Route to todos page when user clicks YES
    router.push("/todos");
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.loadingText}>LOADING...</Text>
      </ThemedView>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.onboardingFrame}>
        <Text style={styles.titleText}>
          HELLO THIS IS YOU&apos;RE ONBOARDING
        </Text>

        <Text style={styles.descriptionText}>
          SO YOU WRITE DOWN WHAT YOU&apos;RE TASKS ARE AND CHECK THEM OFF WHEN
          YOU&apos;RE DONE{"\n"}I WILL HELP BECAUSE I AM WORLDS BEST{"\n"}
          HELPER.
        </Text>

        <View style={styles.buttonContainer}>
          <Text style={styles.understandText}>UNDERSTAND</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleYesClick}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleNoClick}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bad UX: Hidden logout button in tiny text */}
        <TouchableOpacity style={styles.hiddenLogout} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  onboardingFrame: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    width: "90%",
    alignItems: "flex-start",
  },
  titleText: {
    fontFamily: "Times New Roman",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "left",
    color: "#000000",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  descriptionText: {
    fontFamily: "Times New Roman",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "left",
    color: "#000000",
    textTransform: "uppercase",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
  },
  understandText: {
    fontFamily: "Times New Roman",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    color: "#000000",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 95,
    flexWrap: "wrap",
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Times New Roman",
    fontWeight: "400",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  loadingText: {
    fontFamily: "Times New Roman",
    fontSize: 16,
    color: "#000000",
    textTransform: "uppercase",
  },
  hiddenLogout: {
    position: "absolute",
    bottom: 5,
    right: 5,
    opacity: 0.3,
  },
  logoutText: {
    fontFamily: "Times New Roman",
    fontSize: 8,
    color: "#000000",
    textTransform: "uppercase",
  },
});
