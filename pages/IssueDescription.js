import { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, Modal, FlatList, TextInput} from 'react-native'
import ArrowButton from '../components/ArrowButton'
import AuthButton from '../components/AuthButton'
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import LoadingPage from '../components/LoadingScreen';
import { useSelector } from 'react-redux';

//IssueDescription Page

export default function IssueDescription({route}) {
    const problem = route.params

    const [index, setIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const[comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user)

    const [commentList, setCommentList] = useState([])
    async function addComment() {
        try {
            const newComment = {
                text: comment, 
                postId: problem.id,
                userId: user.userId,
                username: user.username
            }
            const commentsCollection = collection(db, "comments")
            const docRef = await addDoc(commentsCollection, newComment)
            setComment('')
            var newCommentList = [newComment, ...commentList]
            setCommentList(newCommentList)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function fetchComments() {
            setLoading(true)
            try {
                const commentsCollection = query(collection(db, 'comments'), where('postId', '==', problem.id))
                const querySnapshot = await getDocs(commentsCollection);
                const results = [];
                querySnapshot.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                });
                setCommentList([...results])
                console.log(commentList)
                setLoading(false)
            } catch(error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchComments()
    }, [])

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

            <AuthButton title="View Comments" style={{width: '50%', margin: 20}} onPress={() => setModalVisible(true)} />
            <Modal      
            animationType="slide"
            visible={modalVisible}
            transparent={true}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View>
                                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Comments</Text>
                                <AuthButton title="Close" onPress={() => setModalVisible(false)} />
                                <View style={{borderBottomWidth: 1, marginTop: 10}}>
                            </View>

                            {loading ? <LoadingPage />  : <View>
                                <FlatList style={{flex: 1}} data={commentList} renderItem={({item, index}) => (
                                    <View style={{margin: 20}}>
                                        <Text style={{fontWeight: 'bold'}}>{item.username}</Text>
                                        <Text>{item.text}</Text>
                                        <View style={{borderBottomWidth: 1}}></View>
                                    </View>
                                )} />
                            </View>}

                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1}}>
                                <TextInput onChangeText={setComment} value={comment} style={{padding: 20, color: 'grey', width: '80%', borderRadius: 8}} placeholder='Enter Comment' />
                                <AuthButton disabled={comment.length === 0} title="Submit" onPress={addComment} style={{width: '20%', backgroundColor: 'orange'}} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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