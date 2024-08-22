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
            setErrorMessage('preencha todos os campos.');
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
                setErrorMessage('falha no login. tente novamente!');
                return;
            }

            const data = await response.json();
            const token = data.token;

            await AsyncStorage.setItem('token', token);

            setErrorMessage(null);
            navigation.navigate('Home');
        } catch (error) {
            setErrorMessage('erro de conexão, tente novamente!');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/lain.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>listinha :)</Text>
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="usuário"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="senha"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleLogin} color="#636363" />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000', 
    },
    container: {
        backgroundColor: '#fff', 
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, 
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000', 
        textAlign: 'center',
        marginBottom: 20,
    },
    error: {
        color: '#FF5252', 
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd', 
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#f5f5f5', 
        color: '#000', 
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#000', 
    },
    buttonText: {
        color: '#1111', 
        textAlign: 'center',
        padding: 12,
        fontWeight: '600',
    },
});

export default LoginScreen;
