import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {View, FlatList, Text, TextInput, StyleSheet, Image} from 'react-native'
import { db } from '../firebaseConfig'
import { useSelector } from 'react-redux'

export default function CommentsPage({route}) {
        const [commentList, setCommentList] = useState([])
        const[comment, setComment] = useState('')
        const [loading, setLoading] = useState(false)
        const user = useSelector(state => state.user)

        const id = route.params.id

        async function addComment() {
            try {
                const newComment = {
                    text: comment, 
                    postId: id,
                    userId: user.userId,
                    username: user.username,
                    date: serverTimestamp()
                }
                const commentsCollection = collection(db, "comments")
                const docRef = await addDoc(commentsCollection, newComment)
                setComment('')
                var newCommentList = [newComment, ...commentList]
                setCommentList(newCommentList)
            } catch(error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            async function fetchComments() {
                setLoading(true)
                try {
                    const commentsCollection = query(collection(db, 'comments'), where('postId', '==', id), orderBy('date', 'desc'))
                    const querySnapshot = await getDocs(commentsCollection);
                    const results = [];
                    querySnapshot.forEach((doc) => {
                        results.push({ id: doc.id, ...doc.data() });
                    });
                    setCommentList([...results])
                    setLoading(false)
                } catch(error) {
                    console.log(error)
                    setLoading(false)
                }
            }
    
            fetchComments()
        }, [])
    return (
<View style={{ flex: 1, backgroundColor: 'white' }}>
    {/* Comment List */}
    <View style={{ flex: 1, padding: 20 }}>
    {!loading && commentList.length === 0 ?  <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>No Comments</Text></View> :
      <FlatList
        data={commentList}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginBottom: 20, width: '100%' }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 20,
              }}
              source={{
                uri: 'https://tse4.mm.bing.net/th/id/OIP.60CzHo23beRRZ374Vr6iuwHaHa?pid=Api&P=0&h=220',
              }}
            />
            <View style={{ flexShrink: 1, flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
              <Text style={{ color: '#A9A9A9' }}>{item.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }} // Prevents last comment being hidden
      />
    }
    </View>

    {/* Input Bar Fixed at Bottom */}
    <View style={{
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      padding: 10,
      backgroundColor: 'white',
      alignItems: 'center'
    }}>
      <TextInput
        onChangeText={setComment}
        value={comment}
        onSubmitEditing={addComment}
        style={styles.textInput}
        placeholder="Enter text"
      />
    </View>
  </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderRadius: 8,
        color: 'grey',
        borderWidth: 1,
        borderColor: 'black',
        width: '80%'
    }
})