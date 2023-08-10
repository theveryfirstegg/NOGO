import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import WheelPicker from 'react-native-wheely';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';


const MainScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date(1598051730000));
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [plateNumber, onChangePlateNum] = useState();
  const [carData, setCarData] = useState([]);
  const [selectedCarIndex, setCarIndex] = useState(0);
  const [isSuccess, setSuccess] = useState(false);

  const url = '"http://example.com/movies.json"';

  /* const getCarsFromAPI = async () => {
    await fetch(url)
    .then((response) => response.json())
    .then((responseJson) => setCarData(responseJson))
    .catch((error) => console.error(error));
  } */

  async function logMovies(){
    const response = await fetch("https://dummyjson.com/products");
    const cars = await response.json();
    setCarData(response.json);
  }

  useEffect(() => {
    Axios.get('https://raw.githubusercontent.com/FormidableLabs/radon-typeahead/master/demo/car-models.json')
    .then((response) => {
        const fetchedOptions = response.data;
        setCarData(fetchedOptions);
        setSuccess(true);
        console.log(fetchedOptions)
    })
  }, []);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChangeState = (event, selectedState) => {
    const currentState = selectedState;
    setDate(currentState);
  }




  const stateArr = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
  'Louisiana', 'Maine', 'Maryland', 'Massachusettes', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
  'West Virginia', 'Wisconsin', 'Wyoming'];


  return (
    <View style={styles.container}>
      <WheelPicker selectedIndex={selectedIndex} 
      options={['Location 1', 'Location 2', 'Location 3', 'Location 4']} 
      onChange= {(index) => setSelectedIndex(index)} />

      <DateTimePicker value={date} mode='datetime' />

      { isSuccess===true && <WheelPicker selectedIndex={selectedCarIndex} options={carData} 
      onChange={(index) => setCarIndex(index)} />}

      <WheelPicker selectedIndex={selectedStateIndex} options={stateArr}
      onChange= {(index) => setSelectedStateIndex(index)} />

      <TextInput style={styles.plateInput} value={plateNumber} 
      onChangeText={onChangePlateNum} placeholder='License Plate #' 
      placeholderTextColor='grey'/>





      
      

    </View>

  );


}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  plateInput: {
    width: 200,
    height: 30,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  }


})