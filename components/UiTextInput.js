import { Text, TextInput, View } from 'react-native'
import styles from './UiTextInput.styles'

const UiTextInput = ({
	label=null,
	style=null,
	placeholder='',
	onChangeText,
	...props
}) => (
	<View style={styles.container}>
		{label && <Text style={styles.label}>{label}</Text>}
		<TextInput
			style={[styles.input, style]}
			placeholder={placeholder}
			onChangeText={onChangeText}
			{...props}
		// autoCapitalize="none"
		/>
	</View>
)

export default UiTextInput