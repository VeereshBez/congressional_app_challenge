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
        },
        addLike: (state, action) => {
            const postIndex = state.findIndex(post => post.id === action.payload.id)
            state[postIndex] = {...state[postIndex], likes: [action.payload.userId, ...state[postIndex].likes]}
        },
        report: (state, action) => {
            const postIndex = state.findIndex(post => post.id === action.payload.id)
            state[postIndex] = {...state[postIndex], reports: [action.payload.userId, ...state[postIndex].reports]}
        }
    }
})

export const {addProblem, setProblems, addLike} = problemsSlice.actions
export const problemReducer = problemsSlice.reducer