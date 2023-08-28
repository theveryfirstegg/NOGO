import { Text, View, Modal, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import styles from './SuccessScreen.styles'

const SuccessScreen = () => {
	const [modalVisible, setModalVisible] = useState(true)
	const nav = useNavigation()

	return (
		<View style={styles.container}>
			<Modal transparent={true} visible={modalVisible} animationType="slide">
				<View style={styles.containerOne}>
					<View style={styles.containerTwo}>
						<Text style={styles.modalText}>Success</Text>

						<Text style={styles.messageText}>
              Vehicle details submitted successfully{' '}
						</Text>

						<TouchableOpacity
							style={styles.okButton}
							onPress={() => {
								setModalVisible(false)
								nav.navigate('Main')
							}}
						>
							<Text style={styles.okText}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<Text style={styles.successTitle}>Vehicle Details</Text>
		</View>
	)
}

export default SuccessScreen
