import { Dimensions, StyleSheet } from 'react-native'

const { height } = Dimensions.get('window')
const scrollHeight = height - 52 - 90 - 40 - 52

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	innerContainer: {
		width: '100%',
		height: scrollHeight,
		// backgroundColor: 'red',
		paddingHorizontal: 20,
	},
	scrollContainer: {
		flex: 1,
		width: '100%',
	},
	dateContainer: {
		marginTop: 10,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
	},
	dateIconContainer: {
		marginRight: 6,
	},
	dateText: {
		fontFamily: 'bold',
		fontSize: 18,
		color: 'black',
		marginRight: 20,
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

	footer: {
		width: '100%',
		height: 52,
		position: 'absolute',
		alignSelf: 'center',
		bottom: 40,
		paddingHorizontal: 20,
	},

	submitText: {
	},

	submitButton: {
		
	},

	submitButtonDisabled: {
		backgroundColor: '#8c780e',
		// opacity: 0.5,
	},

	optionsStyle: {
		fontSize: 22,
	},
})