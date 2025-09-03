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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";

export default function Login({ onLoginSuccess, onForgotPassword }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://localhost:7246/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (response.ok) {
        const userData = {
          token: data.data.token,
          isPasswordUpdated: data.data.user.isPasswordUpdated,
          email: data.data.user.email,
          userId: data.data.user.userId,
        };

        // 🔹 Save to AsyncStorage if remember is checked (optional)
        // await AsyncStorage.setItem("user", JSON.stringify(userData));

        onLoginSuccess(userData);
      } else {
        Alert.alert("❌ Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("❌ Error", "Something went wrong. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>LOGO</Text>

      {/* Welcome text */}
      <Text style={styles.title}>
        Welcome to <Text style={styles.highlight}>SCHOOL NAME</Text>
      </Text>
      <Text style={styles.subtitle}>The Most Popular School.</Text>

      {/* Username */}
      <View style={styles.inputWrapper}>
        <Ionicons name="person-outline" size={20} color="#999" />
        <TextInput
          style={styles.input}
          placeholder="E-mail / Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Remember me + Forgot password */}
      <View style={styles.row}>
  <View style={styles.rowInner}>
    <CheckBox value={remember} onValueChange={setRemember} />
    <Text style={styles.remember}>Remember me</Text>
  </View>

  <TouchableOpacity
  onPress={() => {
    if (typeof onForgotPassword === "function") {
      onForgotPassword(); // no need to pass username here
    }
  }}
>
  <Text style={styles.forgot}>Forgot Password?</Text>
</TouchableOpacity>

</View>


      {/* Sign In Button */}
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={handleLogin}
        disabled={loading}
      >
        <LinearGradient colors={["#00C853", "#B2FF59"]} style={styles.signInBtn}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.signInText}>SIGN IN</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00C853",
    marginBottom: 30,
  },
  title: { fontSize: 22, color: "#fff", marginBottom: 5 },
  highlight: { color: "#00E676", fontWeight: "bold" },
  subtitle: { color: "#aaa", marginBottom: 30 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height: 50,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: "#fff" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  rowInner: { flexDirection: "row", alignItems: "center" },
  remember: { color: "#aaa", marginLeft: 5 },
  forgot: { color: "#00E676", fontWeight: "bold" },
  signInBtn: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  signInText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
