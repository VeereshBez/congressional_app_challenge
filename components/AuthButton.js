import { Button, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";

export default function AuthButton(props) {
    return (
        <TouchableOpacity {...props} style={[styles.button, props.styles, props.disabled ? {backgroundColor: 'grey'} : {}, props.style]}>
            <Text style={{color: props.color || 'white', fontWeight: 'bold'}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        border: 1,
        marginTop: 30,
        backgroundColor: '#4169E1',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
    }
})