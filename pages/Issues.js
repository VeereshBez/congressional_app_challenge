import { useEffect, useState } from 'react'
import {View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity, } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebaseConfig';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { setProblems } from '../state/problems';
import ArrowButton from '../components/ArrowButton';

//Issues Page

export default function IssuesPage({navigation}) {
    const dispatch = useDispatch()
    const problems = useSelector(state => state.problems)
    const [indexes, setIndexes] = useState([])

    useEffect(() => {
        async function fetchData() {
            const issuesRef = collection(db, 'problems')
            try {
                const querySnapshot = await getDocs(issuesRef);
                const results = [];
                querySnapshot.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                });
                dispatch(setProblems(results.sort((a, b) => new Date(b.date) - new Date(a.date))))
            } catch(error) {
                console.log(error)
            }
        }

        if(problems.length === 0) {
            fetchData()
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Button onPress={() => navigation.navigate('ReportProblem')} title="Report A Problem" />
            <View style={{alignItems: 'center', flex: 1, padding: 20}}>
                <FlatList
                    data={problems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.card}>
                            <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                                <Image style={{ width: '100%', height: 200}}  source={{uri: item.photos[0]}} />
                            </View>
                            <View style={{ padding: '10%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{item.title}</Text>
                                <Text style={{ fontStyle: 'italic' }}>
                                {item.annoymous ? 'This issue was submitted anonymously' : `This issue was submitted by ${item.username}`}
                                </Text>
                                <Text>{item.date.slice(0, 24)}</Text>
                                <Text>{item.description}</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('IssueDescription', {...item})}>
                                    <Text style={{color: 'white',  textAlign: 'center', fontWeight: 'bold'}}>View More</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 20,
        width: '100%',
        height: '95%',
        backgroundColor: 'white',
        borderColor: 'white',
        marginTop: 20,
        marginHorizontal: 10
    },
    btn: {
        width: '80%',
        height: 50,
        borderRadius: 30,
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        alignSelf: 'center'
    }
})
