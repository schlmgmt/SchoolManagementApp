import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ spinner state

  const handleLogin = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true); // ✅ show spinner

    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "x-api-key": "reqres-free-v1", // required by Reqres
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username, // must use "email" field
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (response.ok) {
        Alert.alert("✅ Login Successful", `Token: ${data.token}`);
      } else {
        Alert.alert("❌ Login Failed", data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("❌ Error", "Something went wrong. Check your network.");
    } finally {
      setLoading(false); // ✅ hide spinner
    }
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Username */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#999" }]}
          onPress={handleLogin}
          disabled={loading} // ✅ disable while loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2575fc",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
