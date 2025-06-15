import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    // Bad UX: minimal, but present, validation
    if (!email || !password || !confirmPassword) {
      setError("All fields required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email");
      return;
    }
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/onboarding");
    } catch (e: any) {
      setError(e.message || "Login failed");
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerBox}>
        <Text style={styles.loginLabel}>LOGIN</Text>
        <View style={styles.formFields}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                // Always visible (bad UX)
                secureTextEntry={false}
                autoCapitalize="none"
              />
              <MaterialIcons
                name="visibility-off"
                size={28}
                style={styles.eyeIcon}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={false}
                autoCapitalize="none"
              />
              <MaterialIcons
                name="visibility-off"
                size={28}
                style={styles.eyeIcon}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>YOU&apos;RE EMAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={handleSubmit}>
          <MaterialIcons name="arrow-forward" size={80} color="#181C23" />
        </TouchableOpacity>
        {error ? <Text style={styles.badError}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    backgroundColor: "#fff",
    width: "90%",
    height: "90%",
    borderRadius: 0,
    alignItems: "flex-start",
    padding: 40,
    marginTop: 40,
  },
  loginLabel: {
    fontSize: 28,
    fontWeight: "normal",
    marginBottom: 80,
    marginLeft: 10,
    color: "#000",
    alignSelf: "flex-start",
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
  formFields: {
    width: "100%",
    marginBottom: 60,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginLeft: 0,
  },
  label: {
    fontSize: 20,
    fontFamily: "Times New Roman",
    marginRight: 10,
    width: 170,
    color: "#181C23",
    textTransform: "uppercase",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: "#181C23",
    padding: 6,
    fontSize: 20,
    flex: 1,
    marginRight: 4,
    color: "#181C23",
    backgroundColor: "#fff",
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
  eyeIcon: {
    marginLeft: -30,
    marginRight: 10,
    color: "#181C23",
  },
  arrowButton: {
    alignSelf: "center",
    marginTop: 60,
  },
  badError: {
    color: "#b00",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 8,
    marginRight: 10,
    fontStyle: "italic",
    opacity: 0.7,
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
});
