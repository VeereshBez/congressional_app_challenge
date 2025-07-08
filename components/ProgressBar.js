import {View, Text, StyleSheet} from 'react-native'

export default function ProgressBar(props) {
    let color = 'white'
    if(props.progress === 0) {
        color = 'black'
    }
    return (
        <View style={styles.bar}>
            <View style={[styles.progress, {
                width: 250*props.progress,
                borderTopRightRadius: props.progress === 1 ? 8 : 0,
                borderBottomRightRadius: props.progress === 1 ? 8 : 0,
            }]}>
                <Text style={{
                    color,
                    width: 50,
                    textAlign: 'left',
                    marginTop: '1%'
                }}>{props.progress * 100}%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        width: 250,
        height: 30,
        borderRadius: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    progress: {
        height: 29,
        borderRadius: 8,
        backgroundColor: 'green',
        border: 1,
        borderColor: 'black'
    }
})