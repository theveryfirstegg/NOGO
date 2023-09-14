import { Text, TouchableOpacity } from 'react-native'
import styles from './UiButton.styles'

const UiButton = ({
	text = 'Submit',
	style = null,
	textStyle = null,
	...props
}) => (
	<TouchableOpacity
		activeOpacity={0.8}
		style={[styles.container, style]}
		{...props}
	>
		<Text style={[styles.text, textStyle]}>{text}</Text>
	</TouchableOpacity>
)

export default UiButton