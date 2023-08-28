import { View, Image } from 'react-native'
import styles from './SplashSwapScreen.styles'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const SplashSwapScreen = ({ navigation }) => {
	const opacity = useSharedValue(0)
	useEffect(() => {
		opacity.value = withDelay(100, withTiming(1, {duration: 500}))
		setTimeout(() => {
			navigation.navigate('LogIn')
		}, 400)
	}, [])

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.overlay, {opacity}]} />
			<Image style={styles.img} source={require('../assets/splash.png')} />
		</View>
	)
}

export default SplashSwapScreen