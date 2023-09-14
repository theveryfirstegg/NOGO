import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#ffd401',
		paddingHorizontal: 20,
	},

	loginTitle: {
		fontSize: 35,
		fontWeight: '600',
		textAlignVertical: 'top',
		marginTop: 60,
		marginBottom: 20,
	},

	loginButton: {
		width: 340,
		height: 52,
		justifyContent: 'center',
		backgroundColor: 'black',
		borderRadius: 30,
		marginBottom: 15,
	},

	logIn: {
		color: 'white',
		fontWeight: '700',
		fontSize: 18,
		textAlign: 'center',
	},

	input: {
		width: 350,
		height: 50,
		padding: 12,
		borderRadius: 7,
		backgroundColor: '#ffffff',
		color: 'black',
		marginBottom: 15,
		fontSize: 18,
		fontWeight: '600',
	},

	passwordInput: {
		width: 350,
		height: 50,
		padding: 12,
		borderRadius: 7,
		backgroundColor: '#ffffff',
		color: 'black',
		marginBottom: 15,
		paddingRight: 58,
	},

	passwordContainer: {
		flexDirection: 'row',
	},

	showButton: {
		position: 'absolute',
		right: 15,
		top: 14,
		alignItems: 'center',
		justifyContent: 'center',
	},

	forgotPassword: {
		fontWeight: '600',
		fontSize: 18,
	},
	errorContainer: {
		alignSelf: 'flex-start',
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'red',
		width: '100%',
		borderRadius: 7,
		marginBottom: 15,
	},
	errorText: {
		fontFamily: 'bold',
		fontSize: 16,
		color: 'white',
	},
})