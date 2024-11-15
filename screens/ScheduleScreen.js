import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ScheduleScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const periods = ['Manhã', 'Tarde', 'Noite'];

  const onDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const onPeriodSelect = (period) => {
    setSelectedPeriod(period);
  };

  const onConfirmPress = () => {
    if (!selectedDate || !selectedPeriod) {
      alert('Por favor, selecione uma data e um período.');
    } else {
      navigation.navigate('CategorySelection');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a Data</Text>

      <Calendar
        onDayPress={onDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#6200EA' },
        }}
        theme={{
          selectedDayBackgroundColor: '#6200EA',
          todayTextColor: '#6200EA',
          arrowColor: '#6200EA',
        }}
      />

      <Text style={styles.label}>Selecione o Período:</Text>
      <View style={styles.periodContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton,
            ]}
            onPress={() => onPeriodSelect(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.selectedPeriodText,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmPress}>
        <Text style={styles.confirmButtonText}>Fazer Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 15,
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  periodButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  selectedPeriodButton: {
    backgroundColor: '#6200EA',
  },
  periodText: {
    color: '#000',
  },
  selectedPeriodText: {
    color: '#FFF',
  },
  confirmButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ScheduleScreen;
