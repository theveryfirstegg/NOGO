import { View, Image } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'
import styles from './SplashSwapScreen.styles'
import { auth } from '../services/firebase'

const SplashSwapScreen = ({ navigation }) => {
	const opacity = useSharedValue(0)
	
	useEffect(() => {
		
		setTimeout(() => {
			console.log('auth.currentUser::', auth.currentUser)
			const goto = auth.currentUser ? 'Tab' : 'LogIn'
			opacity.value = withDelay(100, withTiming(1, {duration: 500}))
			navigation.navigate(goto)
		}, 400)
      
		// const listener = onAuthStateChanged(auth, async (user) => { 
		// 	setIsAuthenticated(!!user)
		// 	console.log('authenticate!!!')
		// 	const goto = user ? 'Tab' : 'LogIn'
            
		// })
	}, [])

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.overlay, {opacity}]} />
			<Image style={styles.img} source={require('../assets/splash.png')} />
		</View>
	)
}

export default SplashSwapScreen