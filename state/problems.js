import { createSlice } from "@reduxjs/toolkit";


const problemsSlice = createSlice({
    name: 'problems',
    initialState: [],
    reducers: {
        addProblem: (state, action) => {
            state.unshift(action.payload);
        },
        setProblems: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})

export const {addProblem, setProblems} = problemsSlice.actions
export const problemReducer = problemsSlice.reducer