import AsyncStorage from '@react-native-async-storage/async-storage'

const set = async (key, value) => {
	await AsyncStorage.setItem(key, JSON.stringify(value))
}

const get = async (key) => {
	const value = await AsyncStorage.getItem(key)
	return JSON.parse(value)
}

const remove = async (key) => {
	await AsyncStorage.removeItem(key)
}

export default {
	set,
	get,
	remove,
}