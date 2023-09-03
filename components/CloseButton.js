import { TouchableOpacity } from 'react-native'
import Icons from '@expo/vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import settings from '../utils/settings.json'
import styles from './CloseButton.styles'

const CloseButton = ({
	style=null,
	size=30,
	color=settings.colors.dark,
	onPress
}) => {
	const navigation = useNavigation()
	const onPressHandle = () => {
		if (onPress) onPress()
		else navigation.goBack()
	}
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[styles.container, style]}
			onPress={onPressHandle}
		>
			<Icons name="times" size={size} color={color} />
		</TouchableOpacity>
	)
}

export default CloseButton