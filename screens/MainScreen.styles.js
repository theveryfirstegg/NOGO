import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#ffd401',
	},

	locationSheet: {
		flex: 1,
	},

	input: {
		width: 350,
		height: 50,
		padding: 12,
		borderRadius: 7,
		backgroundColor: '#ffffff',
		color: 'black',
		marginBottom: 15,
	},

	mainScreenTitle: {
		fontSize: 35,
		fontWeight: '600',
		textAlignVertical: 'top',
		marginTop: 60,
		marginBottom: 20,
	},

	confirmButton: {
		width: Dimensions.get('window').width,
		height: 90,
		backgroundColor: 'black',
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},

	confirm: {
		color: 'white',
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 18,
	},

	submitText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 18,
		textAlign: 'center',
	},

	submitButton: {
		width: 340,
		height: 52,
		justifyContent: 'center',
		backgroundColor: 'black',
		borderRadius: 30,
		marginTop: 170,
	},

	optionsStyle: {
		fontSize: 20,
	},
})