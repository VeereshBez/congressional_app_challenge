import {View, Text, StyleSheet, Image} from 'react-native'
import { useSelector } from 'react-redux'
import AuthButton from '../components/AuthButton'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

//Profile Page

export default function Profile({route, navigation}) {
    const user = route.params.user
    const currentUser = useSelector(state => state.user)
    const [image, setImage] = useState(null)

    async function onPress() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            return;
        }
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.layout}> 
            <Image style={styles.profilePic} source={{uri: image ? image : user.profilePic}} />
            <Text style={styles.username}>{user.username}</Text>
            <Text>Joined {user.date}</Text>
            {currentUser.userId === user.userId ? <AuthButton title="Take Profile Pic" onPress={onPress} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Roboto_400Regular',
        marginTop: 10
    },
    username: {
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 25,
        color: '#4169E1',
        textAlign: 'center'
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: '100%'
    }
})