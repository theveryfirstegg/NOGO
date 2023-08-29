import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import styles from './LogInScreen.styles'
import users from '../data/proxy/users.json'


const LogInScreen = ({ navigation }) => {
	const [userName, setUserName] = useState('')
	const [userPassword, setPassword] = useState('')
	const [hidePassword, setHidePassword] = useState(true)

	const handleShowPassword = () => {
		setHidePassword(!hidePassword)
	}

	const handleLogIn = () => {
		const found = users.find(
			(element) =>
				element.username === userName && element.password === userPassword
		)

		if (found) {
			navigation.navigate('Main')
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.loginTitle}>Log In</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={setUserName}
				autoCapitalize="none"
			/>
			<View style={styles.passwordContainer}>
				<TextInput
					style={styles.passwordInput}
					placeholder="Password"
					onChangeText={setPassword}
					secureTextEntry={hidePassword}
					autoCapitalize="none"
				/>

				<TouchableOpacity
					style={styles.showButton}
					onPress={handleShowPassword}
				>
					<Text style={{ fontWeight: 600 }}>
						{hidePassword ? 'Show' : 'Hide'}
					</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
				<Text style={styles.logIn}>Log In</Text>
			</TouchableOpacity>

			<TouchableOpacity>
				<Text style={styles.forgotPassword}>Forgot your password?</Text>
			</TouchableOpacity>
		</View>
	)
}

export default LogInScreen
