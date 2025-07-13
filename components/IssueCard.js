import { useNavigation } from '@react-navigation/native'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

export default function IssueCard({item}) {
    const navigation = useNavigation()
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
                    <Text>{item.location}</Text>
                    <Text>{item.date.slice(0, 24)}</Text>
                    <Text style={{marginTop: 20}}>{item.description.slice(0, 100)}...</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('IssueDescription', {...item})}>
                        <Text style={{color: 'white',  textAlign: 'center', fontWeight: 'bold'}}>View More</Text>
                    </TouchableOpacity>
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