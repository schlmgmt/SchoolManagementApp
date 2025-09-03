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

export default function ForgotPassword({ prefilledEmail = "", onNext }) {
  const [email, setEmail] = useState(prefilledEmail || ""); // prefilledEmail can be empty

  const [loading, setLoading] = useState(false);
  
  const handleNext = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your registered email");
      return;
    }

    setLoading(true);

    try {
      // Call your API to verify email or send OTP
      // Example:
      const response = await fetch("https://localhost:7246/api/Auth/ForgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Forgot Password Response:", data);

      if (response.ok) {
        // Navigate to ResetPassword screen
        if (typeof onNext === "function") {
          onNext(email); // pass the email to ResetPassword.js
        }
      } else {
        Alert.alert("Error", data.message || "Email not found");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGO</Text>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your registered email</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={handleNext}
        disabled={loading}
      >
        <LinearGradient colors={["#00C853", "#B2FF59"]} style={styles.nextBtn}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.nextText}>Next</Text>
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
  subtitle: { color: "#aaa", marginBottom: 30 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    height: 50,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: "#fff" },
  nextBtn: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  nextText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
