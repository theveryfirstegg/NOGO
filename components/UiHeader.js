import { View, Text } from 'react-native'
import styles from './UiHeader.styles'

const UiHeader = (props) => {
	const { children: title } = props
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{title}</Text>
		</View>
	)
}

export default UiHeader