import { createSlice } from "@reduxjs/toolkit";
import {doc, updateDoc} from 'firebase/firestore'
import { db } from "../firebaseConfig";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        date: null,
        email: null,
        userId: null,
        isLoggedIn: true,
        profilePic: null,
        coins: null,
        currentCourse: null,
        completedLessons: []
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
            state.date = action.payload.date
            state.email = action.payload.email
            state.userId = action.payload.id
            state.isLoggedIn = true
            state.profilePic = action.payload.profilePic
            state.currentCourse = action.payload.currentCourse,
            state.coins = action.payload.coins
            state.completedLessons = action.payload.completedLessons
        },
        changeEmail: (state, action) => {
            state.email = action.payload.email
        },
        changeCoins: async (state, action) => {
            const docRef = doc(db, 'users', state.userId)
            const newCoins = action.payload.increase ? (state.coins + action.payload.amount) : (state.coins - action.payload.amount)
            state.coins = newCoins
            try {
                await updateDoc(docRef, {
                    coins: newCoins
                })
            } catch (error) {
                console.log(error)
            }
        },
        clearUser: (state, action) => {
            state.username = null
            state.email = null
            state.userId = null
            state.isLoggedIn = false
            state.date = null
            state.profilePic = null
            state.currentCourse = null
            state.completedLessons = []
        },
    }
})

export const { setUser, clearUser, changeEmail, changeCoins } = userSlice.actions;
export const userReducer = userSlice.reducer;