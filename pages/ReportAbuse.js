import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native'
import AuthButton from '../components/AuthButton'

export default function ReportAbusePage() {
    return (
        <View style={{alignItems:'center', display: 'flex', justifyContent: 'center', padding: 20, width: '80%', height: '50%', backgroundColor: 'white', alignSelf: 'center', marginTop: '40%'}}>
            <Text style={{fontWeight: 'bold'}}>Report An Issue</Text>
            <TextInput style={styles.input} placeholder="Summary" />
            <TextInput style={styles.input} multiline={true} numberOfLines={5} placeholder='Description' />
            <AuthButton title="Submit" />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 20,
        borderBottomWidth: 1,
        color: 'grey',
        margin: 20
    }
})