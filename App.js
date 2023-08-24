import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './screens/MainScreen';
import LogInScreen from './screens/LogInScreen';
import SuccessScreen from './screens/SuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
      setAppIsReady(true);
    }
    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if(appIsReady){
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if(!appIsReady){
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LogIn' component={LogInScreen} />
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Success' component={SuccessScreen} />
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
