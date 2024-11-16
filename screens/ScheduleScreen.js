import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Calendar } from 'react-native-calendars';

const ScheduleScreen = ({ route, navigation }) => {
  const { professionalId, professionalName } = route.params; // Recebe os parâmetros passados
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableTimes = Array.from({ length: 15 }, (_, i) => `${10 + i}:00`); // Gera horários de 10h até 24h

  // Função para verificar se a data selecionada é hoje ou futura
  const isValidDate = (date) => {
    const selected = new Date(date); // A data selecionada pelo usuário
    const today = new Date(); // A data atual
    today.setHours(0, 0, 0, 0); // Configura a hora da data atual para 00:00:00 para comparar apenas a data

    // Compara as duas datas apenas pela parte da data (ignorando a hora)
    return selected >= today;
  };

  const onDateSelect = (day) => {
    const formattedDate = day.dateString; // Formato YYYY-MM-DD
    
    if (!isValidDate(formattedDate)) {
      Alert.alert('Erro', 'Você não pode agendar para datas passadas. Por favor, selecione uma data futura.');
      return;
    }

    setSelectedDate(formattedDate);
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Erro', 'Selecione uma data e um horário!');
      return;
    }

    try {
      const userId = auth().currentUser.uid; // Obtém o UID do usuário logado
      const appointmentsRef = firestore().collection('appointments');

      // Verifica se já existe um agendamento para o mesmo profissional, data e horário
      const snapshot = await appointmentsRef
        .where('professionalId', '==', professionalId)
        .where('date', '==', selectedDate)
        .where('time', '==', selectedTime)
        .get();

      if (!snapshot.empty) {
        // Se já houver um agendamento, exibe um alerta
        Alert.alert('Erro', 'Este horário já foi agendado. Por favor, selecione outro horário.');
        return;
      }

      // Caso não haja agendamento, cria o novo agendamento
      await appointmentsRef.add({
        userId,
        professionalId,
        professionalName,
        date: selectedDate,
        time: selectedTime,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert(
        'Sucesso!',
        `Agendamento realizado com ${professionalName} para ${selectedDate} às ${selectedTime}.`
      );

      // Resetando a navegação para que a tela Home seja a única na pilha
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o agendamento. Tente novamente mais tarde.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar com {professionalName}</Text>
      <Calendar
        onDayPress={onDateSelect}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#6200EA',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#6200EA',
          todayTextColor: '#6200EA',
          arrowColor: '#6200EA',
        }}
      />
      <Text style={styles.label}>Data selecionada: {selectedDate || 'Nenhuma'}</Text>
      <Text style={styles.label}>Horário selecionado: {selectedTime || 'Nenhum'}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.timeContainer} // Mudei para contentContainerStyle
      >
        {availableTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[ 
              styles.timeButton,
              selectedTime === time && styles.timeButtonSelected, // Destaca o botão selecionado
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[ 
                styles.timeButtonText,
                selectedTime === time && styles.timeButtonTextSelected, // Destaca o texto selecionado
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedule}>
        <Text style={styles.scheduleButtonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200EA',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  timeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center', // Agora está em contentContainerStyle
  },
  timeButton: {
    backgroundColor: '#FFF',
    borderColor: '#6200EA',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8, // Ajusta o padding para ser mais compacto
    paddingHorizontal: 15, // Ajusta o padding horizontal
    marginHorizontal: 5,
    maxWidth: 120, // Limita a largura máxima dos botões
    justifyContent: 'center', // Garante que o conteúdo do botão esteja centralizado
    alignItems: 'center', // Centraliza o texto dentro do botão
  },
  timeButtonSelected: {
    backgroundColor: '#6200EA',
  },
  timeButtonText: {
    fontSize: 14, // Ajusta o tamanho da fonte para se adequar melhor ao botão
    color: '#6200EA',
    textAlign: 'center', // Garante que o texto ficará centralizado
  },
  timeButtonTextSelected: {
    color: '#FFF',
  },
  scheduleButton: {
    backgroundColor: '#6200EA',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  scheduleButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScheduleScreen;
