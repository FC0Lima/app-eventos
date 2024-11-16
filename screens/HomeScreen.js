import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {
  const handleSchedulePress = () => {
    navigation.navigate('CategorySelection'); // Navega para a tela de seleção de categorias
  };

  const handleAppointmentsPress = () => {
    navigation.navigate('Appointments'); // Navega para a tela de visualização de agendamentos
  };

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Realiza o logout
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o logout. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo</Text>

        <TouchableOpacity style={styles.button} onPress={handleSchedulePress}>
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAppointmentsPress}>
          <Text style={styles.buttonText}>Meus Agendamentos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Espaça os itens para que o logout vá para a parte inferior
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo na parte superior
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EA',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20, // Distância da parte inferior
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#6200EA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default HomeScreen;
