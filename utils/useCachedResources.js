import { useFonts } from 'expo-font'

const useCachedResources = () => {
	const [fontsLoaded] = useFonts({
		regular: require('../assets/fonts/SF-Pro-Rounded-Regular.otf'),
		medium: require('../assets/fonts/SF-Pro-Rounded-Medium.otf'),
		bold: require('../assets/fonts/SF-Pro-Rounded-Bold.otf'),
		black: require('../assets/fonts/SF-Pro-Rounded-Black.otf'),

	})

	return fontsLoaded
}

export default useCachedResources
