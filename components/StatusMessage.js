import {View, Text, StyleSheet} from 'react-native'

export default function StatusMessage(props) {
    if(props.text) {
        setTimeout(() => {
            props.setText(null)
        }, 3000)
    }
    return (
        <View>
            {props.text ?         
            <View style={{...styles.popup, backgroundColor: props.bg}}>
                <Text style={styles.popupText}>{props.text}</Text>
            </View> 
            : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    popup: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        width: 300,
        alignSelf: 'center'
    },
    popupText: {
        color: '#fff',
        fontSize: 16,
    },
})