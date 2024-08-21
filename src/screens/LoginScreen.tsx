
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
    navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
                return;
            }

            const data = await response.json();
            const token = data.token;

            await AsyncStorage.setItem('token', token);

            setErrorMessage(null);
            navigation.navigate('Home');
        } catch (error) {
            setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/bg.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>TDSPY APP</Text>
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleLogin} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Cobre toda a tela
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        width: '100%', // Largura total da tela
        height: '100%', // Altura total da tela
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo branco semitransparente
        padding: 20,
        borderRadius: 10,
        width: '90%', // Proporção da largura da tela
        maxWidth: 400, // Limita o tamanho máximo da largura
        alignItems: 'center', // Centraliza os inputs no container
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%', // Faz o input ocupar toda a largura disponível
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%', // Botão ocupa toda a largura disponível
        borderRadius: 5,
    },
});

export default LoginScreen;
