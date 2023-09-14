import { initializeApp, getApp, getApps } from 'firebase/app'
import { initializeAuth, getReactNativePersistence, getAuth, connectAuthEmulator } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// init firebase
const firebaseConfig = {
	apiKey: Constants.expoConfig.extra.firebaseApiKey,
	authDomain: Constants.expoConfig.extra.firebaseAuthDomain,
	projectId: Constants.expoConfig.extra.firebaseProjectId,
	storageBucket: Constants.expoConfig.extra.firebaseStorageBucket,
	messagingSenderId: Constants.expoConfig.extra.firebaseMessagingSenderId,
	appId: Constants.expoConfig.extra.firebaseAppId,
	measurementId: Constants.expoConfig.extra.firebaseMeasurementId,
}

let app
let auth

if(!getApps().length) {
	try {
		app = initializeApp(firebaseConfig)
		auth = initializeAuth(app, {
			persistence: getReactNativePersistence(AsyncStorage),
		})
		
	} catch (err) {
		console.error('Firebase initialization error raised', err.stack)
	}
} else {
	app = getApp()
	auth = getAuth(app)
}

if (__DEV__) {
	connectAuthEmulator(auth, 'http://192.168.86.153:9099', { disableWarnings: true })
}

export { app, auth }