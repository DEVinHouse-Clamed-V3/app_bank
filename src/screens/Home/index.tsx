import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    const saldo = 1500.75; // Valor de saldo do usuário

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Your Bank</Text>
            <Text style={styles.saldoText}>Seu saldo atual é:</Text>
            <Text style={styles.saldoValue}>R$ {saldo}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    saldoText: {
        fontSize: 18,
        color: '#555',
    },
    saldoValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2ecc71',
        marginTop: 10,
    },
});

export default Home;