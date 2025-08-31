import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "ilTkrZ4dfqo2VVMFl8PDSA==QU5OFwnBMoCRwnfj",
        },
      });
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <Text style={styles.title}>🏠 Home Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"{quote}"</Text>
          <Text style={styles.author}>- {author}</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  quoteCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  quoteText: {
    fontSize: 18,
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffeb3b",
    textAlign: "center",
  },
});
