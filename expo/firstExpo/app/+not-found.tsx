import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

const NotFoundScreen = () => {
    return (
        <>
            <Stack.Screen options={{ title: 'Opss! Página não encontrada' }} />

            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    Ir para página PRINCIPAL!
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});

export default NotFoundScreen