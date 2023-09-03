import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#ffd401',
	},
	sheetHandle: {
		backgroundColor: 'red',
		height: 0,
		padding: 0,
		margin: 0,
		opacity: 0,
	},

	innerContainerSheet: {
		flex: 1,
	},

	innerContainerSheetHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		// backgroundColor: 'red',
		paddingVertical: 10,
		paddingHorizontal: 10,
		top: -4,
	},
	innerContainerButton: {
		marginTop: 10,
		backgroundColor: 'black',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 30,
	},
	innerContainerSheetHeaderText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white',
	},

	input: {
		width: 350,
		height: 50,
		padding: 12,
		borderRadius: 7,
		backgroundColor: '#ffffff',
		color: 'black',
		fontSize: 18,
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

	submitButtonDisabled: {
		backgroundColor: '#8c780e',
		// opacity: 0.5,
	},

	optionsStyle: {
		fontSize: 22,
	},
})