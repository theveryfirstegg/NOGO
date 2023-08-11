import { Modal, Text, View, StyleSheet, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import WheelPicker from 'react-native-wheely';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomSheetModal,BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import states from '../states.json';
import cars from '../carInfo.json';


const MainScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date(1598051730000));
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [plateNumber, onChangePlateNum] = useState();
  const [carData, setCarData] = useState([]);
  const [selectedCarIndex, setCarIndex] = useState(0);
  const [isSuccess, setSuccess] = useState(false);

  const [carTypeIndex, setCarType] = useState(0);
  const [carTypeData, setCarTypeData] = useState([]);
  const [text, onChangeText] = useState('Useless Text');

  

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

  const getModel = (targetIndex) => {
    result = cars[targetIndex]
    return result.models;
  }

  /* Bottom Sheets */
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);



  return (
    <View style={styles.container}>
        <Text style={styles.mainScreenTitle}>Vehicle Details</Text>

        <BottomSheetModalProvider>
            <TouchableOpacity onPress={handlePresentModalPress}>
            <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            readOnly={true}
            onPressIn={handlePresentModalPress} />
            </TouchableOpacity>
                 
            <BottomSheetModal ref={bottomSheetModalRef} 
            index={1} snapPoints={useMemo(() => ['25%', '40%'], [])}>
                <View style={styles.locationSheet}>
                <WheelPicker selectedIndex={selectedIndex} 
                options={['Location 1', 'Location 2', 'Location 3', 'Location 4']} 
                onChange= {(index) => setSelectedIndex(index)} />
        
            </View>
            </BottomSheetModal>

        </BottomSheetModalProvider>
        

    


      {/* { isSuccess && <WheelPicker selectedIndex={selectedCarIndex} options={getBrand(cars)} 
      onChange={(index) => setCarIndex(index)} />} 

      <WheelPicker selectedIndex={carTypeIndex} options={getModel(selectedCarIndex)} 
      onChange={(index) => setCarType(index)}/> 

      <WheelPicker selectedIndex={selectedStateIndex} options={JSON.parse(JSON.stringify(states)).states}
      onChange= {(index) => setSelectedStateIndex(index)} />

      <TextInput style={styles.plateInput} value={plateNumber} 
      onChangeText={onChangePlateNum} placeholder='License Plate #' 
      placeholderTextColor='grey'/> */}





      
      

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

  plateInput: {
    width: 200,
    height: 30,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },

  locationSheet: {
    flex: 1

  },

  input: {
    width: 350,
    height: 40,
    padding: 10,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    color: '#d7d6d7'
    
  },

  mainScreenTitle: {
    fontSize: 35,
    fontWeight: '600',
    textAlignVertical: 'top',
    marginTop: 60,
    marginBottom: 20
  },

  


})
