import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import MainScreen from './screens/MainScreen'
import LogInScreen from './screens/LogInScreen'
import SuccessScreen from './screens/SuccessScreen'
import SplashSwapScreen from './screens/SplashSwapScreen'

const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync()

const App = () => {
	const [appIsReady, setAppIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			setAppIsReady(true)
		}
		prepare()
	}, [])

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
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="SplashSwap" component={SplashSwapScreen} />
						<Stack.Screen name="LogIn" component={LogInScreen} options={{animation: 'fade'}} />
						<Stack.Screen name="Main" component={MainScreen} />
						<Stack.Screen name="Success" component={SuccessScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</View>
		</GestureHandlerRootView>
	)
}

export default App
