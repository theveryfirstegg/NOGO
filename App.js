import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer, useNavigation } from '@react-navigation/native';
import MainScreen from './screens/MainScreen';
import LogInScreen from './screens/LogInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LogIn' component={LogInScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
