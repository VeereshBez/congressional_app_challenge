import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native'
import AuthButton from '../components/AuthButton'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ReportAbusePage() {
    return (
        <View style={{display: 'flex', justifyContent: 'center', padding: 20, width: '80%', height: '60%', backgroundColor: 'white', alignSelf: 'center', marginTop: '40%', borderRadius: 20}}>
            <Icon name='report-problem' size={50} color="red" style={{alignSelf: 'center'}}/>
            <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Report An Issue</Text>
            <Text style={styles.label}>SUMMARY</Text>
            <TextInput style={styles.input} />
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput style={styles.input} multiline={true} numberOfLines={5} />
            <AuthButton title="Submit Issue" style={{width: '80%', alignSelf: 'center', marginBottom: 20}} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 20,
        margin: 20,
        width: '80%',
        borderRadius: 8,
        borderWidth: 1
    },
    label: {
        marginLeft: 20,
        color: 'grey',
        marginTop: 20
    }
})  