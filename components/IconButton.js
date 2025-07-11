import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function IconButton({onPress, name, style, disabled}) {
    return (
        <TouchableOpacity disabled={disabled} style={[styles.btn, style, disabled ? {backgroundColor: 'grey'} : {}]} onPress={onPress}>
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