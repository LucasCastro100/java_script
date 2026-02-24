import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native"; // Adicionei View para ajudar na organização

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#cfcfcf",
        },
        headerTintColor: "#f51515",
        headerTitleAlign: "left",

        // CUSTOMIZAÇÃO DA SETINHA AQUI:
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={{
              paddingLeft: 15,    // Dá distância da borda esquerda da tela
              paddingRight: 20,   // Aumenta a área de toque (mais fácil de clicar)
              paddingVertical: 5, // Aumenta a área de toque verticalmente
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons name="chevron-back" size={28} color="#f51515" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{
        title: "Home",
        headerLeft: () => null // Remove a seta da tela inicial
      }} />

      <Stack.Screen name="contact" options={{
        title: "Contato"
      }} />
    </Stack>
  );
}