import {View, Text, StyleSheet, Touchable, TouchableOpacity, ImageBackground} from 'react-native'
import { TextInput } from 'react-native-web';
import AuthInput from '../components/AuthInput';
import fontsLoaded from '../fonts';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import LoadingPage from '../components/LoadingScreen';
import StatusMessage from '../components/StatusMessage';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/user';

//Login Page

export default function LoginPage({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const onSubmit = async () => {
        setLoading(true)
        const q = query(
            collection(db, "users"),
            where("email", "==", email),
            where("password", "==", password)
        );
        try {
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setLoading(false)
            if(results.length === 0) {
                setMessage('User Not Found')
            } else {
                dispatch(setUser(results[0]))
            }
            setEmail('')
            setPassword('')
        } catch(err) {
            setMessage('Connection Error')
            setLoading(false)
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
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subTitle}>It's great to see you again!</Text>
            <AuthInput value={email} onChangeText={setEmail} placeholder="Email" />
            <AuthInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true}/>
            <AuthButton title="Let's Go!" uppercase={false} onPress={onSubmit} disabled={!email || !password} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{marginTop: 10, color: '#A9A9A9', fontWeight: 'bold'}}>Dont have an account yet?</Text>
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
        fontFamily: 'Roboto_700Bold',
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