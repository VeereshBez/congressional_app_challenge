import { createSlice } from "@reduxjs/toolkit";

const chapterSlice = createSlice({
    name: 'chapters',
    initialState: [],
    reducers: {
        setChapters: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})

export const {setChapters} = chapterSlice.actions
export const chaptersReducer = chapterSlice.reducer