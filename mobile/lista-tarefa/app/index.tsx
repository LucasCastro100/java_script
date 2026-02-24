import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>

      <Link href="/contact" style={styles.button}>
        <Text style={styles.buttonText}>Ir para Contato</Text>
      </Link>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f51515", // Cor de fundo (mesmo vermelho da sua seta)
    paddingVertical: 12,        // Espaçamento em cima e embaixo
    paddingHorizontal: 25,      // Espaçamento nas laterais
    borderRadius: 8,            // Bordas arredondadas (substitui o borderCurve)
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,               // Sombrinha no Android
    shadowColor: "#000",        // Sombrinha no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",              // Texto branco
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
