import {View, Text, StyleSheet, Image} from 'react-native'
import { useSelector } from 'react-redux'
import AuthButton from '../components/AuthButton'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { collection, doc, query, updateDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Picker } from 'react-native-web';
import uploadImage from '../uploadPic';

//Profile Page

export default function Profile({route, navigation}) {
    const user = route.params.user
    const currentUser = useSelector(state => state.user)
    const [image, setImage] = useState(null)

    async function pickImage() {
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
            return result.assets[0].uri
        }
    }

    async function changeProfileUrl(url) {
        const docRef = doc(db, 'users', currentUser.userId)

        try {
            await updateDoc(docRef, {profilePic: url})
        } catch(error) {
            console.log(error)
        }
    }

    async function changeCommentsProfile(url) {
        const commentsRef = collection(db, 'comments')
        const q = query(commentsRef, where('userId', '==', currentUser.userId))
        try {
            const querySnapshot = await getDocs(q);

            const updatePromises = querySnapshot.docs.map(docSnap => {
                const commentRef = doc(db, 'comments', docSnap.id);
                return updateDoc(commentRef, {
                    profilePic: url
                });
            });

            await Promise.all(updatePromises);
        } catch(error) {
            console.log('Error: ' + error)
        }
    }

    async function waterFall() {
        try {
            const result1 = await pickImage()
            if(result1) {
                const result2 = await uploadImage(result1)
                const result3 = await changeProfileUrl(result2)
                const result4 = await changeCommentsProfile(result2)
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.layout}> 
            <Image style={styles.profilePic} source={{uri: image ? image : user.profilePic}} />
            <Text style={styles.username}>{user.username}</Text>
            <Text>Joined {user.date}</Text>
            {currentUser.userId === user.userId ? <AuthButton title="Change Profile Pic" onPress={waterFall}  /> : null}
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