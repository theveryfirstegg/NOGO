import { Text, View, StyleSheet, TextInput, ScrollView, Button, TouchableOpacity, Pressable } from 'react-native';
import { useState, useEffect, useMemo, useRef, useCallback, createRef } from 'react';
import WheelPicker from 'react-native-wheely';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal,BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import states from '../states.json';
import cars from '../carInfo.json';


const MainScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);  /* State for location */
  const [date, setDate] = useState(new Date(1598051730000)); /* State for date */
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const [plateNumber, onChangePlateNum] = useState();

  const [carData, setCarData] = useState([]);
  const [selectedCarIndex, setCarIndex] = useState(0);

  const [isSuccess, setSuccess] = useState(false);
  const [carTypeIndex, setCarType] = useState(0);
  const [carTypeData, setCarTypeData] = useState([]);

  const [carModelChosen, setCarModelChosen] = useState(false);

  const [text, onChangeText] = useState('Useless Text');

  const [carColorIndex, setCarColor] = useState(0);

  const nav = useNavigation();

  

  useEffect(() => {
    result = []
    cars.map((elem) => result.push(elem))
    setCarData(result)
    setSuccess(true)
  }, []);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChangeState = (event, selectedState) => {
    const currentState = selectedState;
    setDate(currentState);
  }

  const getBrand = (jsonObject) => {
    result = []
    cars.map((elem) => result.push(elem.brand))
    return result;
  }

  const handleCarChange = (index) => {
    setCarIndex(index);
    setCarModelChosen(true);
    setCarTypeData(cars[index].models);
  }

  /* Bottom Sheets */

  /* Reference and methods for location bottom sheet */
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
}

  /* Reference and methods for date/time bottom sheet */
  const dateBottomSheet = useRef(null);

  const handleDateTimePress = useCallback(() => {
    dateBottomSheet.current?.present();
  }, []);

  const handleDateTimeClose = () => dateBottomSheet.current.close();

  /* Reference and methods for car make sheet */
  const makeBottomSheet = useRef(null);

  const handleMakePress = useCallback(() => {
    makeBottomSheet.current?.present();
  }, []);

  const handleMakeClose = () => {
    makeBottomSheet.current.close();
    setCarModelChosen(true);
  }

  /* Reference and methods for model sheet */
  const modelBottomSheet = useRef(null);

  const handleModelPress = useCallback(() => {
        modelBottomSheet.current?.present() 
  }, []);

  const handleModelClose = () => modelBottomSheet.current.close();

  /* Reference and methods for color sheet */
  const colorBottomSheet = useRef(null);

  const handleColorPress = useCallback(() => {
    colorBottomSheet.current?.present()
  }, []);

  const handleColorClose = () => colorBottomSheet.current.close();

  /* Reference and methods for state sheet */
  const stateBottomSheet = useRef(null);

  const handleStatePress = useCallback(() => {
    stateBottomSheet.current?.present()
  }, []);

  const handleStateClose = () => stateBottomSheet.current.close();






  return (
    <View style={styles.container}>
        <Text style={styles.mainScreenTitle}>Vehicle Details</Text>

        <BottomSheetModalProvider>
            <TouchableOpacity onPress={handlePresentModalPress}>
            <TextInput
            style={styles.input}
            placeholder='Location'
            readOnly={true}
            onPressIn={handlePresentModalPress}/>
            </TouchableOpacity>
                 
            <BottomSheetModal ref={bottomSheetModalRef} 
            index={1} snapPoints={useMemo(() => ['25%', '40%'], [])} stackBehavior='replace'>
                <View style={styles.locationSheet}>

                <WheelPicker selectedIndex={selectedIndex} 
                options={['Location 1', 'Location 2', 'Location 3', 'Location 4']} 
                onChange= {(index) => setSelectedIndex(index)} />

                <TouchableOpacity style={styles.confirmButton} onPress={handleClosePress}>
                    <Text style={styles.confirm}>Confirm</Text>
                </TouchableOpacity>

                </View>
            </BottomSheetModal>



            <TouchableOpacity>
                <TextInput
                style={styles.input}
                placeholder='Date/time'
                readOnly={true}
                onPressIn={handleDateTimePress} />
            </TouchableOpacity>

            <BottomSheetModal ref={dateBottomSheet} 
            index={1} snapPoints={useMemo(() => ['25%', '40%'], [])} stackBehavior='replace'>
                <View style={styles.locationSheet}>
                    <DateTimePicker value={date} mode='datetime' 
                    is24Hour={true} onChange={setDate} display='spinner'/>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleDateTimeClose}>
                        <Text style={styles.confirm}>Confirm</Text>
                    </TouchableOpacity>
        
                </View>
            </BottomSheetModal>


        
            <TouchableOpacity>
                <TextInput
                style={styles.input}
                placeholder='Make'
                readOnly={true}
                onPressIn={handleMakePress} />
            </TouchableOpacity>

            <BottomSheetModal ref={makeBottomSheet} index={1}
            snapPoints={useMemo(() => ['25%', '40%'], [])} stackBehavior='replace'>

                <View style={styles.locationSheet}>
                { isSuccess && <WheelPicker selectedIndex={selectedCarIndex} options={getBrand(cars)} 
                onChange={handleCarChange} />} 

                <Pressable style={styles.confirmButton} onPress={handleMakeClose}>
                        <Text style={styles.confirm}>Confirm</Text>
                </Pressable>
                    
                </View>


            </BottomSheetModal>


            <TextInput
                style={styles.input}
                placeholder='Model'
                readOnly={true}
                onPressIn={ carModelChosen ? handleModelPress : undefined}
            />

            <BottomSheetModal ref={modelBottomSheet} index={1}
            snapPoints={useMemo(() => ['25%', '40%'], [])} stackBehavior='replace'>
                <View style={styles.locationSheet}>

                { carModelChosen && <WheelPicker selectedIndex={carTypeIndex} options={carTypeData} 
                onChange={(index) => setCarType(index)}/> }

                <TouchableOpacity style={styles.confirmButton} onPress={handleModelClose}>
                        <Text style={styles.confirm}>Confirm</Text>
                </TouchableOpacity>

                </View>

            </BottomSheetModal>



            <TextInput
                style={styles.input}
                placeholder='Color'
                readOnly={true}
                onPressIn={handleColorPress}
             />

             <BottomSheetModal ref={colorBottomSheet} 
             index={1} snapPoints={useMemo(() => ['25%', '40%'], [])} stackBehavior='replace'>
                <View style={styles.locationSheet}>
                    <WheelPicker selectedIndex={carColorIndex} 
                    options={['Black', 'White', 'Gray', 'Blue', 'Green', 'Yellow', 'Orange']}
                    onChange={(index) => setCarColor(index)} />

                    <TouchableOpacity style={styles.confirmButton} onPress={handleColorClose}>
                        <Text style={styles.confirm}>Confirm</Text>
                    </TouchableOpacity>
                    
                </View>

             </BottomSheetModal>



            <TextInput
            style={styles.input}
            placeholder='State' 
            readOnly={true}
            onPressIn={handleStatePress}/>

            <BottomSheetModal ref={stateBottomSheet}
            index={1} snapPoints={useMemo(() => ['25%', '40%'], [])} stackBehavior='behavior'>
                <View style={styles.locationSheet}>

                    <WheelPicker selectedIndex={selectedStateIndex} 
                    options={JSON.parse(JSON.stringify(states)).states}
                    onChange= {(index) => setSelectedStateIndex(index)} />

                    <TouchableOpacity style={styles.confirmButton} onPress={handleStateClose}>
                        <Text style={styles.confirm}>Confirm</Text>
                    </TouchableOpacity>

                </View>

            </BottomSheetModal>

            <TextInput style={styles.input} value={plateNumber} 
            onChangeText={onChangePlateNum} placeholder='License Plate' 
            />

        
            <TouchableOpacity style={styles.submitButton} onPress={() => nav.navigate('Success')}>
                <Text style={styles.submitText}> Submit </Text>
            </TouchableOpacity>

        </BottomSheetModalProvider>


        

        
    



      
      

    </View>

  );


}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffd401',
  },


  locationSheet: {
    flex: 1

  },

  input: {
    width: 350,
    height: 50,
    padding: 12,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    color: '#d7d6d7',
    marginBottom: 15,
    
  },

  mainScreenTitle: {
    fontSize: 35,
    fontWeight: '600',
    textAlignVertical: 'top',
    marginTop: 60,
    marginBottom: 20
  },

  confirmButton: {
    width: 400,
    height: 70,
    backgroundColor: 'black',
    marginTop: 50,
    justifyContent: 'center'
  },

  confirm: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18

  },

  submitText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'

  },

  submitButton: {
    width: 340,
    height: 52,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
    marginTop: 170

  }

  


})