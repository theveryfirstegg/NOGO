/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'
import { useState, useMemo, useRef, useCallback } from 'react'
import dayjs from 'dayjs'
import WheelPicker from 'react-native-wheely'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import styles from './MainScreen.styles'
import states from '../data/states.json'
import cars from '../data/cars.json'
import locations from '../data/locations.json'

const MainScreen = ({ navigation }) => {
	const bottomSheetModalRef = useRef(null)
	const [type, setType] = useState('location')
	const [option, setOption] = useState({
		location: { current: 0, value: 0 },
		date: { current: new Date(), value: new Date() },
		make: { current: 0, value: 0 },
		model: { current: 0, value: 0 },
		state: { current: 0, value: states.findIndex((elem) => elem === 'Tennessee') },
		plate: { current: '', value: '' },
		color: { current: '', value: '' }
	})

	const datetime = useMemo(() => {
		return dayjs(option.date.value).format('MMMM D, YYYY @h:mm A')
	}, [option.date.value])

	const carMakes = useMemo(() => {
		return cars.map((elem) => elem.brand)
	}, [])

	const carModelsCurrent = useMemo(() => {
		return cars[option.make.current].models
	}, [option.make.current])

	const carModelsValue = useMemo(() => {
		return cars[option.make.value].models
	}, [option.make.value])

	const handleOptionSelect = () => {
		bottomSheetModalRef.current.close()
		updateOption(option[type].current, 'value')
	}

	const updateOption = (value, where='current', theType=type) => {
		setOption((prevOption) => ({ 
			...prevOption,
			[theType]: { 
            	...prevOption[theType],
            	[where]: value
			} 
		}))
	}

	const RenderOptionsLocation = () => {
		return (
			<WheelPicker
				selectedIndex={option.location.current}
				options={locations}
				onChange={(index) => updateOption(index)}
				itemTextStyle={styles.optionsStyle} 
			/>
		)
	}

	const RenderOptionsDate = () => {
		return (
			<DateTimePicker
				value={option.date.current}
				mode="datetime"
				is24Hour={true}
				onChange={(e, selectedDate) => updateOption(selectedDate)}
				display="spinner"
				style={{ marginBottom: -16 }}
			/>
		)
	}

	const RenderCarMake = () => {
		return (
			<WheelPicker
				selectedIndex={option.make.current}
				options={carMakes}
				onChange={(index) => {
					updateOption(index)
					updateOption(0, 'value', 'model') // reset car model
				}}
				itemTextStyle={styles.optionsStyle}
			/>
		)
	}

	const RenderCarModel = () => {
		return (
			<WheelPicker
				selectedIndex={option.model.current}
				options={carModelsCurrent}
				onChange={(index) => updateOption(index)}
				itemTextStyle={styles.optionsStyle}
			/>
		)
	}

	const RenderState = () => {
		return (
			<WheelPicker
				selectedIndex={option.state.current}
				options={states}
				onChange={(index) => updateOption(index)}
				itemTextStyle={styles.optionsStyle}
			/>
		)
	}

	const RenderPickerView = ({ type }) => {
		switch (type) {
            
		case 'location':
			return (
				<RenderOptionsLocation />
			)
		case 'date':
			return (
				<RenderOptionsDate />
			)
		case 'make':
			return (
				<RenderCarMake />
			)
		case 'model':
			return (
				<RenderCarModel />
			)
		case 'state':
			return (
				<RenderState />
			)
		default:
			return null
		}
	}

	const handlePresentModal = (theType) => {
		setType(theType)
		updateOption(option[theType].value, 'current', theType)
		bottomSheetModalRef.current?.present()
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
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<Text style={styles.mainScreenTitle}>Vehicle Details</Text>
				<TextInput
					value={locations[option.location.value]}
					style={styles.input}
					placeholder="Location"
					readOnly={true}
					onPressIn={() => handlePresentModal('location')}
				/>
				<TextInput
					value={datetime}
					style={styles.input}
					placeholder="Date/time"
					readOnly={true}
					onPressIn={() => handlePresentModal('date')}
				/>
				<TextInput
					value={carMakes[option.make.value]}
					style={styles.input}
					placeholder="Make"
					readOnly={true}
					onPressIn={() => handlePresentModal('make')}
				/>
				<TextInput
					value={carModelsValue[option.model.value]}
					style={styles.input}
					placeholder="Model"
					readOnly={true}
					onPressIn={() => handlePresentModal('model')}
				/>
				<TextInput
					style={styles.input}
					placeholder="Color"
					value={option.color.value}
					onChangeText={(value) => updateOption(value, 'value', 'color')}
				/>

				<TextInput
					value={states[option.state.value]}
					style={styles.input}
					placeholder="State"
					readOnly={true}
					onPressIn={() => handlePresentModal('state')}
				/>
				<TextInput
					style={styles.input}
					value={option.plate.value}
					onChangeText={(value) => updateOption(value, 'value', 'plate')}
					placeholder="License Plate"
				/>
				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => { navigation.navigate('Success')}}
				>
					<Text style={styles.submitText}>Submit</Text>
				</TouchableOpacity>

				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={0}
					snapPoints={useMemo(() => ['40%'], [])}
					stackBehavior="replace"
					backdropComponent={renderBackdrop}
					handleStyle={styles.sheetHandle}
				>
					<View style={styles.innerContainerSheet}>
						<View style={styles.innerContainerSheetHeader}>
							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.innerContainerButton}
								onPress={handleOptionSelect}>
								<Text style={styles.innerContainerSheetHeaderText}>
                                    Done
								</Text>
							</TouchableOpacity>
						</View>
						<RenderPickerView type={type} />
					</View>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
	)
}

export default MainScreen
