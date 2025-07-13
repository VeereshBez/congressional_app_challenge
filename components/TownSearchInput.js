import axios from 'axios'
import { useState } from 'react'
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native'

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export default function TownSearchInput({location, setLocation}) {
    const [results, setResults] = useState([])
    
    async function fetchTowns(input) {
        const data = await axios.get(`https://secure.geonames.org/searchJSON?name_startsWith=${capitalizeWords(input)}&country=US&featureClass=P&maxRows=5&username=Veeresh_123`)
        setResults(data.data.geonames)
        setLocation(input)
    }

    return (
        <View style={{ flex: 1, paddingTop: 40 }}>
        <TextInput value={location} onChangeText={fetchTowns} placeholder="Enter A Location" style={{padding: 20, width: '100%', borderWidth: 1}} />

        <FlatList
            data={results}
            renderItem={({ item }) => 
            <View style={{width: '100%', borderWidth: 1, padding: 20}}>
            <TouchableOpacity onPress={() => {
                setLocation(item.name + ', ' + item.adminName1)
                setResults([])
            }}>
                <Text><Text style={{fontWeight: 'bold'}}>{item.name}</Text>, <Text style={{color: 'grey'}}>{item.adminName1}</Text></Text>
            </TouchableOpacity>
            </View>
        }
        />
        </View>
    )
}