import {View} from 'react-native'

export default function Line(props) {
    return (
        <View
        style={[{
            width: 2,
            height: 400,
            backgroundColor: 'black',
            position: 'absolute',
            transform: [{ rotate: '45deg' }],
            left: -75,
            top: 15,

        }, props.style]}
        />
    )
}