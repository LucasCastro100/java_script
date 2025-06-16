import { Text, View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

const About = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Sobre' }} />

      <View style={styles.container}>
        <Text style={styles.text}>Home screen</Text>
        <Link href="/" style={styles.button}>
          Ir para página PRINCIPAL!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});

export default About