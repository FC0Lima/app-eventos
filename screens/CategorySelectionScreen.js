  import React from 'react';
  import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

  const CategorySelectionScreen = ({ navigation }) => {
    const categories = ['Músicos', 'Buffet', 'Entretenimento', 'Decoração'];

    const handleCategoryPress = (category) => {
      navigation.navigate('ProfileList', { category });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Escolha uma Categoria</Text>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.button}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
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
    buttonText: {
      color: '#FFF',
      fontSize: 18,
    },
  });

  export default CategorySelectionScreen;
