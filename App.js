import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import CategorySelectionScreen from './screens/CategorySelectionScreen';
import ProfileListScreen from './screens/ProfileListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Agendar' }} />
        <Stack.Screen name="CategorySelection" component={CategorySelectionScreen} options={{ title: 'Categorias' }} />
        <Stack.Screen name="ProfileList" component={ProfileListScreen} options={{ title: 'Perfis' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
