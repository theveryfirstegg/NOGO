import { Text, View, StyleSheet, TextInput, Modal, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import users from '../userInfo.json';
import { useState } from 'react';

const LogInScreen = () => {
    const nav = useNavigation();
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('')
    const [hidePassword,  setHidePassword] = useState(true)

    const handleShowPassword = () => {
        setHidePassword(!hidePassword);
    }

    const handleLogIn = () => {
        const found = users.find((element) => element.username === userName && 
        element.password === userPassword);

        if(found){
            nav.navigate('Main');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.loginTitle}>Log In</Text>

            <TextInput style={styles.input}
            placeholder='Email'
            onChangeText={setUserName}
            autoCapitalize='none'
             />
            <View style={styles.passwordContainer}>
                <TextInput style={styles.passwordInput}
                placeholder='Password'
                onChangeText={setPassword}
                secureTextEntry={hidePassword}
                autoCapitalize='none' />

                <TouchableOpacity style={styles.showButton} 
                onPress={handleShowPassword}>
                    <Text style={{fontWeight: 600}}>{ hidePassword ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity>
               

            </View>

            <TouchableOpacity style={styles.loginButton} 
             onPress={handleLogIn}> 

             <Text style={styles.logIn}>Log In</Text>
             
             </TouchableOpacity>

             <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot your password?</Text>
             </TouchableOpacity>


        </View>

    )


}

export default LogInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffd401',
    },

    loginTitle: {
        fontSize: 35,
        fontWeight: '600',
        textAlignVertical: 'top',
        marginTop: 60,
        marginBottom: 20

    },

    loginButton: {
        width: 340,
        height: 52,
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 30,
        marginBottom: 15
    },

    logIn: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center'

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

    passwordInput: {
        width: 350,
        height: 50,
        padding: 12,
        borderRadius: 7,
        backgroundColor: '#ffffff',
        color: '#d7d6d7',
        marginBottom: 15,
        paddingRight: 58

    },

    passwordContainer: {
        flexDirection: 'row',
    },
    
    showButton: {
        position: 'absolute',
        right: 15,
        top: 14,
        width: 35,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    forgotPassword: {
        fontWeight: '600',
        fontSize: 18
    }
})