import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { useFont } from "@/contexts/FontContext";
import { useRouter } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../firebase/firebase-config";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export default function TodosPage() {
  const { user, loading } = useAuth();
  const { currentFont } = useFont();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLockoutModal, setShowLockoutModal] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(60);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.replace("/");
      return;
    }

    if (!user) return;

    // Set up real-time listener for todos
    const todosRef = collection(db, "todos");
    const q = query(
      todosRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [user, loading, router]);

  // Block navigation when lockout modal is showing
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (showLockoutModal) {
          // Block back navigation during lockout
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription?.remove();
    }, [showLockoutModal])
  );

  // Countdown timer logic
  useEffect(() => {
    let interval: number;

    if (showLockoutModal && countdownSeconds > 0) {
      interval = setInterval(() => {
        setCountdownSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showLockoutModal, countdownSeconds]);

  const addTodo = async () => {
    if (!newTodoText.trim() || !user) return;

    try {
      await addDoc(collection(db, "todos"), {
        text: newTodoText.trim(),
        completed: false,
        userId: user.uid,
        createdAt: new Date(),
      });
      setNewTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (todoId: string, completed: boolean) => {
    try {
      // Bad UX: Complete ALL todos when user clicks on any single todo!
      const incompleteTodos = todos.filter((todo) => !todo.completed);

      if (incompleteTodos.length > 0) {
        // Complete all incomplete todos
        const updatePromises = incompleteTodos.map((todo) => {
          const todoRef = doc(db, "todos", todo.id);
          return updateDoc(todoRef, { completed: true });
        });

        await Promise.all(updatePromises);

        // Trigger confetti celebration (misleading!)
        setShowConfetti(true);

        // Hide confetti after animation
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);

        // Show lockout modal after confetti ends (ultimate bad UX!)
        setTimeout(() => {
          setShowLockoutModal(true);
          setCountdownSeconds(60); // Reset countdown
        }, 3500);
      }
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  const handleOkPress = () => {
    if (countdownSeconds === 0) {
      setShowLockoutModal(false);
    }
    // If countdown > 0, button does nothing (bad UX!)
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

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Button */}
        <TouchableOpacity
          style={styles.profileButtonTop}
          onPress={() => router.push("/profile")}
        >
          <Text style={[styles.profileButtonText, { fontFamily: currentFont }]}>
            CLICK TO SEE YOUR PROFILE
          </Text>
        </TouchableOpacity>

        {/* Task Input */}
        <View style={styles.inputFrame}>
          <TextInput
            style={[styles.taskInput, { fontFamily: currentFont }]}
            value={newTodoText}
            onChangeText={setNewTodoText}
            placeholder="WRITE YOU'RE TASKS"
            placeholderTextColor="#999"
          />
        </View>

        {/* Commit Button */}
        <TouchableOpacity style={styles.commitFrame} onPress={addTodo}>
          <Text style={[styles.commitText, { fontFamily: currentFont }]}>
            COMMIT
          </Text>
        </TouchableOpacity>

        {/* Todo List */}
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoFrame}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.completed && <View style={styles.checkmark} />}
            </TouchableOpacity>
            <Text
              style={[
                styles.todoText,
                { fontFamily: currentFont },
                todo.completed && styles.completedText,
              ]}
            >
              {todo.text.toUpperCase()}
            </Text>
          </View>
        ))}

        {/* Sample todos if no todos exist (bad UX: confusing default data) */}
        {todos.length === 0 && (
          <>
            <View style={styles.todoFrame}>
              <View style={styles.checkbox} />
              <Text style={[styles.todoText, { fontFamily: currentFont }]}>
                BADA
              </Text>
            </View>
            <View style={styles.todoFrame}>
              <View style={styles.checkbox} />
              <Text style={[styles.todoText, { fontFamily: currentFont }]}>
                DRICKA VATTEN
              </Text>
            </View>
            <View style={styles.todoFrame}>
              <View style={styles.checkbox} />
              <Text style={[styles.todoText, { fontFamily: currentFont }]}>
                TA MEDICINER
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bad UX Confetti - celebrates completing ALL tasks when user only wanted to complete one! */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={true}
          fadeOut={true}
          colors={[
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ]}
        />
      )}

      {/* Ultimate Bad UX: Lockout Modal - traps users for 60 seconds! */}
      <Modal
        visible={showLockoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}} // Block modal close
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalText, { fontFamily: currentFont }]}>
              YOU&apos;RE ALL DONE FOR TODAY{"\n"}
              YOU CAN USE THIS APP AFTER{"\n"}
              {countdownSeconds > 0
                ? `${countdownSeconds} SECONDS`
                : "0 SECONDS"}
              .{"\n"}
              BYE.
            </Text>

            <TouchableOpacity
              style={[
                styles.okButton,
                countdownSeconds > 0 && styles.disabledButton,
              ]}
              onPress={handleOkPress}
            >
              <Text style={[styles.okButtonText, { fontFamily: currentFont }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  inputFrame: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    width: 371,
    justifyContent: "center",
    alignItems: "center",
  },
  taskInput: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
    width: "100%",
    textAlign: "left",
  },
  commitFrame: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  commitText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  todoFrame: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "#000000",
  },
  todoText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  profileButtonTop: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  profileButtonText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 20,
    margin: 20,
    alignItems: "center",
  },
  modalText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  okButton: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  okButtonText: {
    fontFamily: "Times New Roman",
    fontSize: 12,
    color: "#000000",
    textTransform: "uppercase",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
