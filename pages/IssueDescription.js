import { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, Modal, FlatList, TextInput} from 'react-native'
import ArrowButton from '../components/ArrowButton'
import AuthButton from '../components/AuthButton'
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import LoadingPage from '../components/LoadingScreen';
import { useSelector } from 'react-redux';

//IssueDescription Page

export default function IssueDescription({navigation, route}) {
    const problem = route.params

    const [index, setIndex] = useState(0)

    const user = useSelector(state => state.user)

    return (
        <View>
            <ImageBackground style={{width: '100%', height: 300}} source={{uri: problem.photos[index]}} >
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 190}}>
                    <ArrowButton disabled={index === 0} direction="back" style={{width: 50, height: 50}} onPress={() => {
                        setIndex(index - 1)
                    }} />
                    <ArrowButton disabled={index+1 === problem.photos.length} direction="forward" style={{width: 50, height: 50}} onPress={() => {
                        setIndex(index+1)
                    }} />
                </View>
            </ImageBackground>
            <Text style={{margin: 20, fontWeight: 'bold', fontSize: 25}}>{problem.title}</Text>
            <Text style={{ fontStyle: 'italic', margin: 20 }}>
                    {problem.annoymous ? 'This issue was submitted anonymously' : `This issue was submitted by ${problem.username}`}
            </Text>
            <Text style={{margin: 20}}>{problem.description}</Text>

            <AuthButton title="View Comments" style={{width: '50%', margin: 20}} onPress={() => navigation.navigate('CommentsPage', {id: problem.id})} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderBottomWidth: 1
    },
        
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)', // optional dim
    },
    modalContainer: {
        height: '80%',
        backgroundColor: 'white',
        padding: 20,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        height: '100%',
        justifyContent: 'space-between'
    }
})