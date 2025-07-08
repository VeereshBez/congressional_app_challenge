import { useEffect } from 'react'
import {View} from 'react-native'
import { fetchBillsForState, fetchAllBills, fetchStates } from '../billsFetch';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

//Bills Page


export default function BillsPage() {


    useEffect(() => {
        const bills = []
        const stateAbbreviations = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

        async function fetchData(state) {
            try {
            const response = await fetchBillsForState(state);
            const data = response.data;
            console.log(data);
            } catch (error) {
            console.error('Error fetching bills:', error);
            }
        }

        async function addBill(doc) {
            const collection = collection(db, 'bills')
            await addDoc(collection, doc)
        }

        stateAbbreviations.forEach((s) => {
            fetchBillsForState(s).then(response => {
                const data = response.data

                data.forEach((d) => {
                    addBill(d).then(response => {
                        console.log('yee howdy')
                    })
                })
            })
        })
    }, [])

    return (
        <View>
            
        </View>
    )
}