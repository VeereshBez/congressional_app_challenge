import { useEffect, useState } from 'react'
import {View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity, } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebaseConfig';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { setProblems } from '../state/problems';
import ArrowButton from '../components/ArrowButton';
import IssueCard from '../components/IssueCard';

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
        <View style={{ flex: 1}}>
            <Button onPress={() => navigation.navigate('ReportProblem')} title="Report A Problem" />
            <View style={{alignItems: 'center', flex: 1, padding: 20}}>
                <FlatList
                    data={problems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <IssueCard item={item} />
                        )
                    }}
                />
            </View>
        </View>
    )
}