import {View, Text, StyleSheet} from 'react-native'
import AuthButton from '../components/AuthButton'
import ProgressBar from '../components/ProgressBar'
import { useSelector } from 'react-redux'
import { useScrollToTop } from '@react-navigation/native'

//Profile Page

export default function Profile({navigation}) {
    const user = useSelector(state => state.user)
    return (
        <View style={styles.layout}> 
            <View style={styles.avatar}>

            </View>
            <View>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.coins}>{user.coins} Coins</Text>
            </View>
            <Text style={{fontWeight: 'bold'}}>Chapter {user.currentCourse.number}: {user.currentCourse.name}</Text>
            <ProgressBar progress={(user.currentCourse.currentLesson - 1)/10} />
            <AuthButton onPress={() => navigation.navigate('Learn')} title="Go To Course!" />
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Roboto_400Regular'
    },
    avatar: {
        marginTop: 20,
        width: 100,
        height: 300,
        backgroundColor: 'red'
    },
    username: {
        margin: 20,
        fontWeight: 'bold',
        fontSize: 25,
        color: '#4169E1',
        textAlign: 'center'
    },
    coins: {
        textAlign: 'center'
    }
})