import {
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useTheme } from '@react-navigation/native'
import Icons from '@expo/vector-icons/FontAwesome5'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import styles from './LogInScreen.styles'
import { auth } from '../services/firebase'
import UiTextInput from '../components/UiTextInput'

const LogInScreen = ({ navigation }) => {
	const { colors: theme } = useTheme()
	const [userName, setUserName] = useState('')
	const [userPassword, setPassword] = useState('')
	const [hidePassword, setHidePassword] = useState(true)
	const [error, setError] = useState(false)

	const hidePasswordIcon = hidePassword ? 'eye' : 'eye-slash'

	const handleShowPassword = () => {
		setHidePassword(!hidePassword)
	}

	const handleLogIn = async () => {
		await signInWithEmailAndPassword(auth, userName, userPassword).then(() => {
			setError(false)
			navigation.navigate('Tab')
		}).catch(() => {
			setError(true)
		})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.loginTitle}>Log In</Text>
                
				{error && (
					<Animated.View
						entering={FadeIn} 
						exiting={FadeOut} 
						style={styles.errorContainer}>
						<Text style={styles.errorText}>
                            Invalid email or password
						</Text>
					</Animated.View>
				)}

				<UiTextInput
					placeholder="Email"
					onChangeText={setUserName}
					autoCapitalize="none"
				/>
                
				<View style={styles.passwordContainer}>
					<UiTextInput
						placeholder="Password"
						onChangeText={setPassword}
						secureTextEntry={hidePassword}
						autoCapitalize="none"
					/>

					<TouchableOpacity
						style={styles.showButton}
						onPress={handleShowPassword}
					>
						<Icons name={hidePasswordIcon} size={20} color={theme.text} />
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
					<Text style={styles.logIn}>Log In</Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text style={styles.forgotPassword}>Forgot your password?</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default LogInScreen
