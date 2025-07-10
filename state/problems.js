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
            state[index] = {...state[index], likes: [action.payload.userId, ...state[index].likes]}
        }
    }
})

export const {addProblem, setProblems} = problemsSlice.actions
export const problemReducer = problemsSlice.reducer