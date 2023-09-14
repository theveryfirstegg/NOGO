import { TextInput } from 'react-native'
import styles from './UiTextInput.styles'

const UiTextInput = ({
	style = null,
	placeholder='',
	onChangeText,
	...props
}) => (
	<TextInput
		style={[styles.input, style]}
		placeholder={placeholder}
		onChangeText={onChangeText}
		{...props}
		// autoCapitalize="none"
	/>
)

export default UiTextInput