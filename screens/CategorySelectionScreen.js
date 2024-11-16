import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Firebase Firestore

const CategorySelectionScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Mostra um indicador de carregamento enquanto os dados estão sendo obtidos

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Buscando as categorias da coleção 'professionals' e agrupando por 'category'
        const snapshot = await firestore()
          .collection('professionals')
          .orderBy('category', 'asc') // Ordenando as categorias
          .get();

        // Criação de uma lista única de categorias
        const categoriesData = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.category && !categoriesData.includes(data.category)) {
            categoriesData.push(data.category); // Adiciona a categoria à lista se não estiver já presente
          }
        });

        setCategories(categoriesData); // Atualiza o estado com as categorias encontradas
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      } finally {
        setLoading(false); // Desativa o carregamento
      }
    };

    fetchCategories();
  }, []); // O efeito será executado apenas uma vez, quando o componente for montado

  const handleSelectCategory = (category) => {
    navigation.navigate('ProfileList', {
      category: category, // Passa diretamente a categoria (string)
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando categorias...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a Categoria</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={item}
              onPress={() => handleSelectCategory(item)} // Passa a categoria selecionada
              color="#6200EA" // Alterando a cor do botão para #6200EA
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Usando o índice como chave
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40, // Aumentando o espaço abaixo do título
  },
  buttonContainer: {
    marginBottom: 20, // Aumentando o espaço entre os botões
    borderRadius: 10, // Tornando os botões mais arredondados
    overflow: 'hidden', // Garantindo que o arredondamento seja aplicado
  },
});

export default CategorySelectionScreen;
