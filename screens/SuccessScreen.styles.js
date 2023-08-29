import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#ffd401',
	},

	successTitle: {
		fontSize: 35,
		fontWeight: '600',
		textAlignVertical: 'top',
		marginTop: 60,
		marginBottom: 20,
	},

	modalContainer: {
		top: '50%',
		height: '50%',
	},

	containerOne: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	containerTwo: {
		width: 350,
		height: 250,
		borderWidth: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},

	modalText: {
		color: 'white',
		fontSize: 30,
		fontWeight: '600',
		margin: 20,
	},

	okButton: {
		width: 210,
		height: 43,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffd401',
		borderRadius: 20,
		marginTop: 20,
	},

	okText: {
		fontSize: 16,
		fontWeight: '700',
	},

	messageText: {
		flexWrap: 'wrap',
		color: '#666665',
		fontSize: 20,
		textAlign: 'center',
	},
})