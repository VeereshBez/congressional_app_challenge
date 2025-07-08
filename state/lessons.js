import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name: 'lesson',
    initialState: [],
    reducers: {
        setLessons: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})

export const {setLessons} = lessonSlice.actions
export const lessonReducer = lessonSlice.reducer