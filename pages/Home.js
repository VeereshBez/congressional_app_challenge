import {View, Text, StyleSheet, Touchable, TouchableOpacity, ImageBackground, Image} from 'react-native'
import AuthButton from '../components/AuthButton'
import { useEffect } from 'react'
import axios from 'axios'

//Home Page

export default function HomePage({navigation}) {
    return (
        <ImageBackground style={styles.layout} source={require('../assets/auth_background.png')} >
        <Image source={require('../assets/home-image.png')} style={{width: '50%', height: '50%', alignSelf: 'center'}} />
        <View>
            <Text style={styles.title}>Your Voice. Your Community. Your Power</Text>
            <Text style={{textAlign: 'center'}}>Changing your community for the better starts with you.</Text>
            <Text style={{textAlign: 'center'}}>Join now to make the world a better place. </Text>
        </View>
        <View style={styles.buttonRow}>
            <AuthButton title="Log In" styles={{width: '40%'}} onPress={() => {navigation.navigate('LogIn')}} />
            <AuthButton title="Register" color='black' onPress={() => {navigation.navigate('Register')}} 
            styles={{width: '40%', backgroundColor: 'white'}} 
            />
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    layout: {
        alignContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4169E1',
        textAlign: 'center'
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})