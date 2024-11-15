import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';

const profiles = {
  Músicos: [
    { name: 'DJ Fictício', description: 'Especialista em música eletrônica e remix.', price: 'R$ 300/hora' },
    { name: 'Banda de Jazz', description: 'Música ao vivo para eventos sofisticados.', price: 'R$ 500/hora' },
    { name: 'Violinista Clássico', description: 'Violinista com repertório de música clássica.', price: 'R$ 200/hora' },
    { name: 'Cantor Solo', description: 'Cantor com repertório variado de MPB e pop.', price: 'R$ 250/hora' },
    { name: 'Pianista', description: 'Performance ao piano para recepções e eventos formais.', price: 'R$ 400/hora' },
  ],
  Buffet: [
    { name: 'Buffet Gourmet', description: 'Cardápio refinado com ingredientes de alta qualidade.', price: 'R$ 1000/evento' },
    { name: 'Buffet Vegetariano', description: 'Opções 100% vegetarianas e saudáveis.', price: 'R$ 800/evento' },
    { name: 'Buffet Italiano', description: 'Pratos italianos clássicos e autênticos.', price: 'R$ 900/evento' },
    { name: 'Buffet Japonês', description: 'Sushi e sashimi preparados por especialistas.', price: 'R$ 1200/evento' },
    { name: 'Buffet de Doces', description: 'Mesa de doces variados para festas.', price: 'R$ 600/evento' },
  ],
  Entretenimento: [
    { name: 'Palhaço', description: 'Palhaço para animação de festas infantis.', price: 'R$ 150/hora' },
    { name: 'Show de Mágica', description: 'Apresentação de mágica para crianças e adultos.', price: 'R$ 300/hora' },
    { name: 'Animadores', description: 'Animadores para manter o público entretido.', price: 'R$ 200/hora' },
    { name: 'Teatro de Fantoches', description: 'Espetáculo interativo de fantoches.', price: 'R$ 250/hora' },
    { name: 'Show de Luzes', description: 'Efeitos de luz para eventos noturnos.', price: 'R$ 400/evento' },
  ],
  Decoração: [
    { name: 'Decoração Floral', description: 'Decoração com flores naturais para qualquer evento.', price: 'R$ 1000/evento' },
    { name: 'Decoração Minimalista', description: 'Decoração simples e elegante.', price: 'R$ 800/evento' },
    { name: 'Decoração Rústica', description: 'Estilo rústico com elementos naturais.', price: 'R$ 900/evento' },
    { name: 'Decoração Vintage', description: 'Decoração inspirada em estilos antigos.', price: 'R$ 1200/evento' },
    { name: 'Decoração Luxuosa', description: 'Decoração sofisticada com materiais de luxo.', price: 'R$ 2000/evento' },
  ],
};

const ProfileListScreen = ({ route }) => {
  const { category } = route.params;
  const selectedProfiles = profiles[category] || [];
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const availableTimes = ['10:00', '12:00', '14:00', '16:00', '18:00'];

  const handleSchedulePress = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const handleTimeSelect = (time) => {
    alert(`Horário marcado: ${time} para ${selectedProfile.name}`);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfis de {category}</Text>

      <FlatList
        data={selectedProfiles}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.profileContainer}>
            <Text style={styles.profileName}>{item.name}</Text>
            <Text style={styles.profileDescription}>{item.description}</Text>
            <Text style={styles.profilePrice}>{item.price}</Text>

            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => handleSchedulePress(item)}
            >
              <Text style={styles.scheduleButtonText}>Marcar Horário</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para exibir horários disponíveis */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha um horário para {selectedProfile?.name}</Text>
            {availableTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={styles.timeButton}
                onPress={() => handleTimeSelect(time)}
              >
                <Text style={styles.timeButtonText}>{time}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scheduleButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  timeButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  timeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF5252',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ProfileListScreen;
