import { Dimensions, StyleSheet } from 'react-native'

const tabHeight = 80
const mainSize = 80
const mainGutter = 10
const windowWidth = Dimensions.get('window').width

export default StyleSheet.create({
	container: {
		height: tabHeight,
		width: '100%',
		flexDirection: 'row',
	},
	tab: {
		flex: 1,
		backgroundColor: '#000000',
		paddingTop: 14,
		alignItems: 'center',
	},
	tabBadge: {
		backgroundColor: 'orange',
		position: 'absolute',
		top: 6,
		zIndex: 1,
		transform: [{translateX: 15}],
		width: 18,
		height: 18,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabBadgeText: {
		fontFamily: 'black',
		fontSize: 12,
	},
	tabLeft: {
		borderTopRightRadius: 12,
	},
	tabRight: {
		borderTopLeftRadius: 12,
	},
	tabTextContainer: {
		marginTop: 5,
	},
	tabText: {
		fontFamily: 'medium',
		letterSpacing: 1,
		fontSize: 11,
	},
	tabMainContainer: {
		// backgroundColor: 'red',
		top: -40,
		width: mainSize + mainGutter,
		height: mainSize + mainGutter,
		borderRadius: mainSize + mainGutter,
	},
	tabMain: {
		position: 'absolute',
		zIndex: 1,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		borderRadius: mainSize,
		backgroundColor: '#ffd401',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabMainInner: {
	    width: mainSize,
		height: mainSize,
		borderRadius: mainSize / 2,
		backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabMainFiller: {
		position: 'absolute',
		bottom: -50,
		width: mainSize + mainGutter,
		height: mainSize + mainGutter,
		backgroundColor: '#000000',
	},
})