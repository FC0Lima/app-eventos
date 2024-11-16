import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProfileListScreen = ({ route, navigation }) => {
  const { category } = route.params; // Recebe a categoria da navegação anterior
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const snapshot = await firestore()
          .collection('professionals')
          .where('category', '==', category)
          .get();

        const professionalsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfessionals(professionalsData);
      } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [category]);

  const handleSelectProfessional = (professional) => {
    // Passa as informações do profissional para a tela de agendamento
    navigation.navigate('Schedule', {
      professionalId: professional.id,
      professionalName: professional.name,
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um Profissional</Text>
      <FlatList
        data={professionals}
        renderItem={({ item }) => (
          <View style={styles.profileContainer}>
            <Text style={styles.profileName}>{item.name}</Text>
            <Text style={styles.profileDescription}>{item.description}</Text>
            <Text style={styles.profilePrice}>Preço: {item.price}</Text>
            <Text style={styles.profileContact}>Contato: {item.contact}</Text>
            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => handleSelectProfessional(item)}
            >
              <Text style={styles.scheduleButtonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileContainer: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  profilePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6200EA',
    marginBottom: 10,
  },
  profileContact: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  scheduleButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ProfileListScreen;
