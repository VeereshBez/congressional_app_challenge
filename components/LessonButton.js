import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LessonButton(props) {
    return (
        <View style={[styles.btn, props.locked ? styles.locked : styles.unlocked, props.style,]}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon name="star" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {  
        borderWidth: 1,
        height: 100,
        width: 100,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    unlocked: {
        backgroundColor: '#6a5acd',
        borderColor: '#6a5acd'
    },
    locked: {
        backgroundColor: '#95a5a6',
        borderColor: '#95a5a6'
    }
})