import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import AuthButton from '../components/AuthButton'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import ImagePicker from '../components/ImagePicker'
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { addProblem } from '../state/problems'
import { useNavigation } from '@react-navigation/native'
import { changeCoins } from '../state/user'

//Report Problem Page

export default function ReportProblemPage() {
  const [annoymous, setAnnoymouse] = useState(false)
  const [date, setDate] = useState(new Date());
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [ready, setReady] = useState(false)

  const navigation = useNavigation()

  const dispatch = useDispatch()

  var user = useSelector(state => state.user)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [urls, setUrls] = useState([])

    const showDatePicker = () => {
    DateTimePickerAndroid.open({
        value: date,
        onChange: (event, selectedDate) => {
        if (selectedDate) setDate(selectedDate);
        },
        mode: 'date',
        is24Hour: true,
    });
    };

    async function onSubmit() {
        var problemsCollection = collection(db, 'problems')
        var newProblem = {
            title,
            description,
            annoymous,
            date: String(date),
            photos: urls,
            userId: user.userId,
            username: user.username,
            likes: [],
            reports: []
        }

        try {
        var docRef = await addDoc(problemsCollection, newProblem)
        dispatch(addProblem({id: docRef.id, ...newProblem}))
        dispatch(changeCoins({amount: 5, increase: true}))
        navigation.popToTop();
        } catch(error) {
          console.log(error)
        }
    }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 23 }}>Report A Problem</Text>
        {showImagePicker ? 
        <View>
            <ImagePicker urls={urls} setUrls={setUrls} setReady={setReady} /> 
            {ready ? <AuthButton title="Submit Issue" onPress={onSubmit} /> : null}
        </View>
        :
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={styles.caption}>Title</Text>
          <TextInput onChangeText={setTitle} value={title} style={styles.input} placeholder='Enter meaningful title' />
          <Text style={styles.caption}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder='Describe the issue'
            multiline={true}
            numberOfLines={5}
          />
          <Text style={styles.caption}>Date</Text>

          <TouchableOpacity onPress={showDatePicker} style={styles.btn}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          <Text style={styles.caption}>Location</Text>

          <Text style={styles.caption}>Report Annoymously?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: annoymous ? 'green' : '#A9A9A9',
                  borderColor: annoymous ? 'green' : '#A9A9A9',
                },
              ]}
              onPress={() => setAnnoymouse(true)}
            >
              <Text style={{ color: 'white' }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {
                  backgroundColor: !annoymous ? 'green' : '#A9A9A9',
                  borderColor: !annoymous ? 'green' : '#A9A9A9',
                },
              ]}
              onPress={() => setAnnoymouse(false)}
            >
              <Text style={{ color: 'white' }}>No</Text>
            </TouchableOpacity>
          </View>

          <AuthButton title="Next" onPress={() => setShowImagePicker(true)} />
        </View>
        }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 // fill the whole screen
    justifyContent: 'center',// center vertically
    alignItems: 'center',    // center horizontally
  },
  btn: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  content: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 30,
    width: '80%',
    height: '80%',
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    color: 'grey',
  },
  caption: {
    fontWeight: 'bold',
    margin: 10,
  },
})
