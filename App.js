import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { View } from 'react-native'
import settings from './utils/settings.json'
import MainScreen from './screens/MainScreen'
import LogInScreen from './screens/LogInScreen'
import SuccessScreen from './screens/SuccessScreen'
import SplashSwapScreen from './screens/SplashSwapScreen'
import TabScreen from './screens/TabScreen'
import useCachedResources from './utils/useCachedResources'

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#ffd401',
	},
}

const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync()

const App = () => {
	const appIsReady = useCachedResources()

	const onLayoutView = useCallback(async () => {
		if (appIsReady) {
			setTimeout(async () => {
				await SplashScreen.hideAsync()   
			}, 100)
			
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{flex: 1}} onLayout={onLayoutView}>
				<NavigationContainer theme={theme}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="SplashSwap" component={SplashSwapScreen} />
						<Stack.Screen name="LogIn"
							component={LogInScreen}
							options={{animation: 'fade'}}
						/>
						<Stack.Screen
							name="Tab"
							component={TabScreen}
							options={{animation: 'fade'}}
						/>
						<Stack.Screen name="Main"
							component={MainScreen}
							options={{
								...settings.screenOptions,
								title: 'Add Ticket',
								presentation: 'modal',
							}} 
						/>
						{/* <Stack.Screen name="Success" component={SuccessScreen} /> */}
                        
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		</GestureHandlerRootView>
	)
}

export default App
