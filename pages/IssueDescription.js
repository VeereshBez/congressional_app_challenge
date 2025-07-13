import { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, Modal, FlatList, TextInput, Touchable, TouchableOpacity, ScrollView} from 'react-native'
import ArrowButton from '../components/ArrowButton'
import AuthButton from '../components/AuthButton'
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, updateDoc, arrayUnio, doc, arrayUnion } from 'firebase/firestore';
import LoadingPage from '../components/LoadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../components/IconButton';
import { addLike } from '../state/problems';
import Icon from 'react-native-vector-icons/MaterialIcons';

//IssueDescription Page

export default function IssueDescription({navigation, route}) {
    const problem = route.params

    const [index, setIndex] = useState(0)
    const [numLikes, setNumLikes] = useState(problem.likes)

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    async function like() {
        const issueRef = doc(db, 'problems', problem.id)
        try {
            await updateDoc(issueRef, {likes: arrayUnion(user.userId)})
            dispatch(addLike({id: problem.id, userId: user.userId}))
            setNumLikes([user.userId, ...numLikes])
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white' }}>
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
            <View style={{marginHorizontal: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>{problem.title}</Text>
                {problem.annoymous ? <Text style={{fontStyle: 'italic'}}>This issue is annoymous</Text> : 
                <Text style={{fontStyle: 'italic'}}>
                    This issue was submitted by <TouchableOpacity style={{color: 'blue'}} onPress={() => navigation.navigate}><Text>{problem.username}</Text></TouchableOpacity>
                </Text> }
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>{numLikes.length}</Text>
                    <Icon name="thumb-up" style={{marginLeft: 5}} size={20} />
                </View>
                {false ? <AuthButton title="Add Update" /> : 
                <TouchableOpacity onPress={() => navigation.navigate("ReportAbuse")}>
                    <Text style={{color: 'red',  marginBottom: 30}}>Report This Post</Text>
                </TouchableOpacity>
                }
            </View>
             <ScrollView style={{marginHorizontal: 20}}>
                <Text>{problem.description}</Text>
            </ScrollView>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: 20}}>
                <IconButton name="comment" onPress={() => navigation.navigate('CommentsPage', {id: problem.id})} style={{width: '20%'}} />
                <IconButton disabled={numLikes.includes(user.userId)} name="thumb-up" onPress={like} style={{width: '20%', backgroundColor: 'green'}} />
            </View>
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