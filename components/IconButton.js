import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function IconButton({onPress, name, style}) {
    return (
        <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
            <Icon color="white" name={name} size={24} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        border: 1,
        backgroundColor: '#4169E1',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
    }
})