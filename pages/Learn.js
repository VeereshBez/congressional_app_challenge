import {View, Text, StyleSheet, FlatList, ActivityIndicator, Modal} from 'react-native'
import { useSelector } from 'react-redux'
import LessonButton from '../components/LessonButton'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import chaptersData from '../chapters'
import AuthButton from '../components/AuthButton';
import ArrowButton from '../components/ArrowButton';

//Learn Page

export default function LearnPage() {
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [chapterIndex, setChapterIndex] = useState(user.currentCourse.number - 1)
    const [update, setUpdate] = useState(false)

    const [lessons, setLessons] = useState([])

    async function getLessons() {
        setLoading(true)
        const q = query(
            collection(db, "lessons"),
            where("course", "==", chaptersData[chapterIndex]),
        );
        try {
            setLoading(false)
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            console.log(results)
            setUpdate(false)
            return results.sort((a, b) => a.num - b.num)
        } catch(err) {
            console.log(err)
            setUpdate(false)
        }
    }

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            const data = await getLessons()
            if (isMounted) {
                console.log(data)
                 setLessons(data)
            }
        };

        fetchData();

        return () => {
            // cleanup function
            isMounted = false;
        };
    }, [chapterIndex])

    return (
        <>
        <View style={styles.layout}>
            <View style={styles.titleCard}>
                <Text style={styles.title}>Unit {chapterIndex+1}</Text>
                <Text style={styles.subtitle}>
                    {chapters[chapterIndex]}
                </Text>
            </View>
            {loading ? <ActivityIndicator style={{alignSelf: 'center'}} /> :
            <FlatList data={lessons} renderItem={({item, index}) => (
                <View style={{alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start', margin: 20}} >
                <LessonButton locked={
                    (!(index+1 <= user.currentCourse.currentLesson) || (user.currentCourse.currentLesson < chapterIndex + 1))
                } completed={false} onPress={() => {
                    setModalVisible({
                        ...item, 
                        locked: !(index+1 <= 1) || (user.currentCourse > chapterIndex + 1)
                    })
                } } />
                </View>
            )} />
        }
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1}}>
            <ArrowButton direction={'back'} disabled={chapterIndex === 0} onPress={() => {
                setChapterIndex(prev => prev - 1)
                setUpdate(true)
            }} />
            <ArrowButton direction={'forward'} disabled={chapterIndex === 9} onPress={() => {
                setChapterIndex(prev => prev + 1)
                setUpdate(true)
            }} />
        </View>
        <Modal         
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Lesson #{modalVisible.num}: {modalVisible.name}</Text>
                        <Text>{modalVisible.description}</Text>
                        <AuthButton title="Close" onPress={() => setModalVisible(false)} color="black" style={{backgroundColor: 'white'}} />
                        <AuthButton title="Let's Go!" onPress={() => navigator.navigate('ContentPage', {lesson: modalVisible})} />
                    </View>
                </View>
            </View>
        </Modal>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    titleCard: {
        width: '100%',
        height: '10%',
        backgroundColor: '#4169E1',
        padding: 20,
    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    subtitle: {
        color: 'white'
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)', // optional dim
    },
    modalContainer: {
        height: '50%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'flex-start'
    }
})
