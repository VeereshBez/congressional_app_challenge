import { useState } from 'react';
import {TextInput, StyleSheet} from 'react-native'
import fontsLoaded from '../fonts';

export default function AuthInput(props) {
    const [focused, setFocused] = useState(false)
    return (
        <TextInput {...props} style={[styles.input, focused && styles.focused]} 
        onBlur={() => setFocused(false)} 
        onFocus={() => setFocused(true)} />
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        marginTop: 50,
        width: '100%',
        backgroundColor: '#E6F7F7',
        borderRadius: 8,
        height: 40,
        color: '#A9A9A9',
    },
    focused: {
        borderWidth: 1,
        borderColor: 'blue',
        color: 'black'
    }
})