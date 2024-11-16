import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = auth().currentUser.uid; // Obtém o UID do usuário logado
        const snapshot = await firestore()
          .collection('appointments')
          .where('userId', '==', userId)
          .orderBy('date') // Ordena por data
          .orderBy('time') // Ordena por horário
          .get();

        const appointmentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = (appointmentId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este agendamento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await firestore().collection('appointments').doc(appointmentId).delete();
              setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId)); // Remove da lista local
              Alert.alert('Sucesso', 'Agendamento excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o agendamento. Tente novamente mais tarde.');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EA" />
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyMessage}>Você não possui nenhum agendamento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text style={styles.cardTitle}>{item.professionalName}</Text>
            <Text style={styles.cardText}>Data: {item.date}</Text>
            <Text style={styles.cardText}>Horário: {item.time}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6200EA',
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderColor: '#6200EA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6200EA',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF4D4D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AppointmentsScreen;
