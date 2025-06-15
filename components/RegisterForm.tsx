import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebase-config";

export default function RegisterForm(props: { onRegistered: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
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
      await createUserWithEmailAndPassword(auth, email, password);
      props.onRegistered();
    } catch (e: any) {
      setError(e.message || "Registration failed");
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerBox}>
        <Text style={styles.heroTitle}>WORLDS BEST HELPER</Text>
        <Text style={styles.heroDescription}>
          NEED A FRIENDLY HAND TO KEEP TRACK OF WHAT TO DO, LOOK NO FURTHER,
          HERE I AM.
        </Text>
        <Text style={styles.registerLabel}>REGISTER NOW!</Text>
        <View style={styles.formFields}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
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
        <TouchableOpacity style={styles.commitButton} onPress={handleSubmit}>
          <Text style={styles.commitText}>COMMIT</Text>
        </TouchableOpacity>
        <View style={styles.agreeRow}>
          <Checkbox value={true} disabled={true} style={styles.checkbox} />
          <Text style={styles.agreeText}>I agree</Text>
        </View>
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
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
    color: "#181C23",
    alignSelf: "flex-start",
    letterSpacing: 1,
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
  heroDescription: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
    color: "#555",
    alignSelf: "flex-start",
    lineHeight: 22,
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
  registerLabel: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    marginLeft: 10,
    color: "#181C23",
    alignSelf: "flex-start",
    letterSpacing: 2,
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
  commitButton: {
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: "#181C23",
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 0,
  },
  commitText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
  },
  checkbox: {
    marginRight: 8,
    width: 22,
    height: 22,
  },
  agreeText: {
    fontSize: 18,
    color: "#181C23",
    fontFamily: "Times New Roman",
    textTransform: "uppercase",
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
