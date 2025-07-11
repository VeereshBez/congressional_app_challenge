import {View, Text, StyleSheet, Touchable, TouchableOpacity, ImageBackground, useWindowDimensions} from 'react-native'
import { TextInput } from 'react-native-web';
import AuthInput from '../components/AuthInput';
import fontsLoaded from '../fonts';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/user';
import LoadingPage from '../components/LoadingScreen';
import StatusMessage from '../components/StatusMessage';
import { setDefaultEventParameters } from 'firebase/analytics';

//Register page


export default function RegisterPage({navigation}) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const onSubmit = async () => {
            setLoading(true)
          try {
            const usersCollection = collection(db, 'users')
            var newUser = {
                username: username,
                email: email,
                password: password,
                date: new Date().toDateString(),
                profilePic: '',
                lessons: [],
                profilePic: 'https://tse4.mm.bing.net/th/id/OIP.60CzHo23beRRZ374Vr6iuwHaHa?pid=Api&P=0&h=220',
                currentCourse: {
                    name: 'Introduction To Civics',
                    number: 1,
                    currentLesson: 1
                },
                coins: 0
            }
            const docRef = await addDoc(usersCollection, newUser);
            dispatch(setUser({id: docRef.id, ...newUser}))
            setEmail('')
            setPassword('')
            setUsername('')
            setLoading(false)
        } catch (e) {
            console.error('Error adding user: ', e);
            setLoading(false)
            setMessage("Connection Error")
        }
    }

    return (
        <>
        {loading ? <LoadingPage /> : 
        <ImageBackground  style={styles.layout} source={require('../assets/auth_background.png')} >
        <View style={{width: '100%'}}>
            <StatusMessage text={message} setText={setMessage} bg="red" />
        </View>
        <View style={{marginTop: 30}}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subTitle}>Create an account so you can help you community!</Text>
            <AuthInput value={email} onChangeText={setEmail} placeholder="Email" />
            <AuthInput value={username} onChangeText={setUsername} placeholder="Username" />
            <AuthInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true}/>
            <AuthButton title="Create Account" uppercase={false} onPress={onSubmit} disabled={!username || !email || !password} />
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={{marginTop: 10, color: '#A9A9A9', fontWeight: 'bold'}}>Already have an account?</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
        }
        </>
    )
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: '20%',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#4169E1',
        textAlign: 'center'
    },

    subTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    }
})