/* eslint-disable no-restricted-syntax */
import {
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView
} from 'react-native'
import { useState, useMemo, useRef, useCallback, useLayoutEffect } from 'react'
import dayjs from 'dayjs'
import Icons from '@expo/vector-icons/FontAwesome5'
import WheelPicker from 'react-native-wheely'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { useTheme } from '@react-navigation/native'
import styles from './AddTicketScreen.styles'
import states from '../data/states.json'
import cars from '../data/cars.json'
import locations from '../data/locations.json'
import CloseButton from '../components/CloseButton'
import UiTextInput from '../components/UiTextInput'
import UiButton from '../components/UiButton'

const AddTicketScreen = ({ navigation }) => {
	const { colors: theme } = useTheme()
	const bottomSheetModalRef = useRef(null)
	const [type, setType] = useState('location')
	const [option, setOption] = useState({
		location: { current: 0, value: 0 },
		// date: { current: new Date(), value: new Date() },
		make: { current: 0, value: 0 },
		model: { current: 0, value: 0 },
		state: { current: 0, value: states.findIndex((elem) => elem === 'Tennessee') }, 
		plate: { current: '', value: '' },
		color: { current: '', value: '' }
	})

	// const datetime = useMemo(() => dayjs(option.date.value).format('MMMM D, YYYY @h:mm A'), [option.date.value])

	const carMakes = useMemo(() => cars.map((elem) => elem.brand), [])

	const carModelsCurrent = useMemo(() => cars[option.make.current].models, [option.make.current])

	const carModelsValue = useMemo(() => cars[option.make.value].models, [option.make.value])

	const isReadyToSubmit = useMemo(() => {
		for (const [key] of Object.entries(option)) {
			if (option[key].value === '') {
				return false
			}
		}
		return true
	}, [option])

	const updateOption = (value, where='current', theType=type) => {
		setOption((prevOption) => ({ 
			...prevOption,
			[theType]: { 
            	...prevOption[theType],
            	[where]: value
			} 
		}))
	}

	const handleOptionSelect = () => {
		bottomSheetModalRef.current.close()
		updateOption(option[type].current, 'value')
	}

	const RenderOptionsLocation = useCallback(() => (
		<WheelPicker
			selectedIndex={option.location.current}
			options={locations}
			onChange={(index) => updateOption(index)}
			itemTextStyle={styles.optionsStyle} 
		/>
	), [option.location])

	const RenderOptionsDate = useCallback(() => (
		<DateTimePicker
			value={option.date.current}
			mode="datetime"
			is24Hour
			onChange={(e, selectedDate) => updateOption(selectedDate)}
			display="spinner"
			style={{ marginBottom: -16 }}
		/>
	), [option.date])

	const RenderCarMake = useCallback(() => (
		<WheelPicker
			selectedIndex={option.make.current}
			options={carMakes}
			onChange={(index) => {
				updateOption(index)
				updateOption(0, 'value', 'model') // reset car model
			}}
			itemTextStyle={styles.optionsStyle}
		/>
	), [option.make])

	const RenderCarModel = useCallback(() => (
		<WheelPicker
			selectedIndex={option.model.current}
			options={carModelsCurrent}
			onChange={(index) => updateOption(index)}
			itemTextStyle={styles.optionsStyle}
		/>
	), [option.model])

	const RenderState = useCallback(() => (
		<WheelPicker
			selectedIndex={option.state.current}
			options={states}
			onChange={(index) => updateOption(index)}
			itemTextStyle={styles.optionsStyle}
		/>
	), [option.state])

	const RenderPickerView = useCallback(({ type: theType }) => {
		switch (theType) {
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
	}, [RenderOptionsLocation, RenderOptionsDate, RenderCarMake, RenderCarModel, RenderState])

	const handlePresentModal = (theType) => {
		Keyboard.dismiss()
		setType(theType)
		updateOption(option[theType].value, 'current', theType)
		bottomSheetModalRef.current?.present()
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <CloseButton />,
		})
	}, [navigation])

	/* Bottom Sheet Backdrops */
	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				opacity={0.3}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				pressBehavior="close"
			/>
		),
		[]
	)

	return (
		<BottomSheetModalProvider>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<View style={styles.innerContainer}>
						<View style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
							<View style={styles.dateContainer}>
								<View style={styles.dateIconContainer}>
									<Icons name="calendar" size={20} color={theme.text} />
								</View>
								<Text style={styles.dateText}>
									{dayjs().format('MMMM D, YYYY')}
								</Text>
								<View style={styles.dateIconContainer}>
									<Icons name="clock" size={20} color={theme.text} />
								</View>
								<Text style={styles.dateText}>
									{dayjs().format('h:mm A')}
								</Text>
							</View>

							<UiTextInput
								// label="Location"
								value={locations[option.location.value]}
								placeholder="Location"
								readOnly
								onPressIn={() => handlePresentModal('location')}
							/>
							{/* 
						<UiTextInput
							value={datetime}
							style={styles.input}
							placeholder="Date/time"
							readOnly
							onPressIn={() => handlePresentModal('date')}
						/> */}
	
							<UiTextInput
								// label="Make"
								value={carMakes[option.make.value]}
								style={styles.input}
								placeholder="Make"
								readOnly
								onPressIn={() => handlePresentModal('make')}
							/>

							<UiTextInput
								// label="Model"
								value={carModelsValue[option.model.value]}
								style={styles.input}
								placeholder="Model"
								readOnly
								onPressIn={() => handlePresentModal('model')}
					
							/>
				
							<UiTextInput
								// label="Color"
								style={styles.input}
								placeholder="Color"
								value={option.color.value}
								onChangeText={(value) => updateOption(value, 'value', 'color')}
							/>

							<UiTextInput
								// label="State"
								value={states[option.state.value]}
								style={styles.input}
								placeholder="State"
								readOnly
								onPressIn={() => handlePresentModal('state')}
							/>

							<UiTextInput
								// label="License Plate Number"
								style={styles.input}
								value={option.plate.value}
								onChangeText={(value) => updateOption(value, 'value', 'plate')}
								placeholder="License Plate"
							/>
						
						</View>
					</View>
					<View style={styles.footer}>
						<UiButton
							text="Submit"
							textStyle={!isReadyToSubmit && styles.submitTextDisabled}
							style={!isReadyToSubmit && styles.submitButtonDisabled}
							disabled={!isReadyToSubmit}
							onPress={() => { navigation.navigate('Success')}}
						/>
					</View>

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
			</TouchableWithoutFeedback>
		</BottomSheetModalProvider>
	)
}

export default AddTicketScreen
