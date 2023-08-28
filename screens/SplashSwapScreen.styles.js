import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	overlay: {
		position: 'absolute',
		backgroundColor: '#fcd406',
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	img: {
		resizeMode: 'cover',
		width: '100%',
		height: '100%',
	},
})
