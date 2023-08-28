import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Pressable,
	Dimensions
} from 'react-native'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import WheelPicker from 'react-native-wheely'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import styles from './MainScreen.styles'
import states from '../data/states.json'
import cars from '../data/cars.json'

const MainScreen = () => {
	const [selectedIndex, setSelectedIndex] =
    useState(0) /* State for location */
	const [date, setDate] = useState(
		new Date(1598051730000)
	) /* State for date */
	const [selectedStateIndex, setSelectedStateIndex] =
    useState(0) /* State for state */
	const [plateNumber, onChangePlateNum] =
    useState('') /* State for plate number */

	const [carData, setCarData] = useState([])
	const [selectedCarIndex, setCarIndex] = useState(0)

	const [isSuccess, setSuccess] = useState(false)
	const [carTypeIndex, setCarType] = useState(0)
	const [carTypeData, setCarTypeData] = useState([])

	const [carModelChosen, setCarModelChosen] = useState(false)

	const [carColor, setCarColor] = useState('')

	const nav = useNavigation()

	/* Stat */
	const [locationSelected, setLocation] = useState(false)
	const [dateTimeSelected, setDateTime] = useState(false)
	const [modelSelected, setModel] = useState(false)
	const [stateSelected, setState] = useState(false)

	const windowWidth = Dimensions.get('window').width

	useEffect(() => {
		result = []
		cars.map((elem) => result.push(elem))
		setCarData(result)
		setSuccess(true)
	}, [])

	const getBrand = (jsonObject) => {
		result = []
		cars.map((elem) => result.push(elem.brand))
		return result
	}

	const handleCarChange = (index) => {
		setCarIndex(index)
		setCarModelChosen(true)
	}

	/* Bottom Sheets */

	/* Reference and methods for location bottom sheet */
	const bottomSheetModalRef = useRef(null)

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])

	const handleClosePress = () => {
		bottomSheetModalRef.current.close()
		setLocation(true)
	}

	/* Reference and methods for date/time bottom sheet */
	const dateBottomSheet = useRef(null)

	const handleDateTimePress = useCallback(() => {
		dateBottomSheet.current?.present()
	}, [])

	const handleDateTimeClose = () => {
		dateBottomSheet.current.close()
		setDateTime(true)
	}

	/* Reference and methods for car make sheet */
	const makeBottomSheet = useRef(null)

	const handleMakePress = useCallback(() => {
		makeBottomSheet.current?.present()
	}, [])

	const handleMakeClose = () => {
		makeBottomSheet.current.close()
		setCarModelChosen(true)
	}

	/* Reference and methods for model sheet */
	const modelBottomSheet = useRef(null)

	const handleModelPress = useCallback(() => {
		modelBottomSheet.current?.present()
	}, [])

	const handleModelClose = () => {
		modelBottomSheet.current.close()
		setModel(true)
	}

	/* Reference and methods for state sheet */
	const stateBottomSheet = useRef(null)

	const handleStatePress = useCallback(() => {
		stateBottomSheet.current?.present()
	}, [])

	const handleStateClose = () => {
		stateBottomSheet.current.close()
		setState(true)
	}

	/* Bottom Sheet Backdrops */
	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				opacity={0.3}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior={'close'}
			/>
		),
		[]
	)

	return (
		<View style={styles.container}>
			<Text style={styles.mainScreenTitle}>Vehicle Details</Text>

			<BottomSheetModalProvider>
				<TextInput
					style={styles.input}
					placeholder="Location"
					readOnly={true}
					onPressIn={handlePresentModalPress}
				/>

				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={0}
					snapPoints={useMemo(() => ['40%'], [])}
					stackBehavior="replace"
					backdropComponent={renderBackdrop}
				>
					<View style={styles.locationSheet}>
						<WheelPicker
							selectedIndex={selectedIndex}
							options={['Location 1', 'Location 2', 'Location 3', 'Location 4']}
							onChange={(index) => setSelectedIndex(index)}
							itemTextStyle={styles.optionsStyle}
						/>

						<TouchableOpacity
							style={styles.confirmButton}
							onPress={handleClosePress}
						>
							<Text style={styles.confirm}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</BottomSheetModal>

				<TouchableOpacity>
					<TextInput
						style={styles.input}
						placeholder="Date/time"
						readOnly={true}
						onPressIn={handleDateTimePress}
					/>
				</TouchableOpacity>

				<BottomSheetModal
					ref={dateBottomSheet}
					index={0}
					snapPoints={useMemo(() => ['40%'], [])}
					stackBehavior="replace"
					backdropComponent={renderBackdrop}
				>
					<View style={styles.locationSheet}>
						<DateTimePicker
							value={date}
							mode="datetime"
							is24Hour={true}
							onChange={(event, selectedDate) => {
								if (event?.type === 'dismissed') {
									setDate(date)
									return
								}
								setDate(selectedDate)
							}}
							display="spinner"
							style={{ marginBottom: -16 }}
						/>

						<TouchableOpacity
							style={styles.confirmButton}
							onPress={handleDateTimeClose}
						>
							<Text style={styles.confirm}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</BottomSheetModal>

				<TouchableOpacity>
					<TextInput
						style={styles.input}
						placeholder="Make"
						readOnly={true}
						onPressIn={handleMakePress}
					/>
				</TouchableOpacity>

				<BottomSheetModal
					ref={makeBottomSheet}
					index={0}
					snapPoints={useMemo(() => ['40%'], [])}
					stackBehavior="replace"
					backdropComponent={renderBackdrop}
				>
					<View style={styles.locationSheet}>
						{isSuccess && (
							<WheelPicker
								selectedIndex={selectedCarIndex}
								options={getBrand(cars)}
								onChange={handleCarChange}
								itemTextStyle={styles.optionsStyle}
							/>
						)}

						<Pressable style={styles.confirmButton} onPress={handleMakeClose}>
							<Text style={styles.confirm}>Confirm</Text>
						</Pressable>
					</View>
				</BottomSheetModal>

				<TextInput
					style={styles.input}
					placeholder="Model"
					readOnly={true}
					onPressIn={() => {
						setCarTypeData(cars[selectedCarIndex].models)
						if (carModelChosen) {
							handleModelPress()
						}
					}}
				/>

				<BottomSheetModal
					ref={modelBottomSheet}
					index={0}
					snapPoints={useMemo(() => ['40%'], [])}
					stackBehavior="replace"
					backdropComponent={renderBackdrop}
				>
					<View style={styles.locationSheet}>
						{carModelChosen && (
							<WheelPicker
								selectedIndex={carTypeIndex}
								options={carTypeData}
								onChange={(index) => setCarType(index)}
								itemTextStyle={styles.optionsStyle}
							/>
						)}

						<TouchableOpacity
							style={styles.confirmButton}
							onPress={handleModelClose}
						>
							<Text style={styles.confirm}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</BottomSheetModal>

				<TextInput
					style={styles.input}
					placeholder="Color"
					value={carColor}
					onChangeText={setCarColor}
				/>

				<TextInput
					style={styles.input}
					placeholder="State"
					readOnly={true}
					onPressIn={handleStatePress}
				/>

				<BottomSheetModal
					ref={stateBottomSheet}
					index={0}
					snapPoints={useMemo(() => ['40%'], [])}
					stackBehavior="behavior"
					backdropComponent={renderBackdrop}
				>
					<View style={styles.locationSheet}>
						<WheelPicker
							selectedIndex={selectedStateIndex}
							options={JSON.parse(JSON.stringify(states)).states}
							onChange={(index) => setSelectedStateIndex(index)}
							itemTextStyle={styles.optionsStyle}
						/>

						<TouchableOpacity
							style={styles.confirmButton}
							onPress={handleStateClose}
						>
							<Text style={styles.confirm}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</BottomSheetModal>

				<TextInput
					style={styles.input}
					value={plateNumber}
					onChangeText={onChangePlateNum}
					placeholder="License Plate"
				/>

				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => {
						if (
							locationSelected &&
              stateSelected &&
              dateTimeSelected &&
              carModelChosen &&
              modelSelected &&
              carColor !== '' &&
              plateNumber !== ''
						) {
							nav.navigate('Success')
						}
					}}
				>
					<Text style={styles.submitText}> Submit </Text>
				</TouchableOpacity>
			</BottomSheetModalProvider>
		</View>
	)
}

export default MainScreen


