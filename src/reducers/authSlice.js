import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) ||  null
}

const authSlice = createSlice({
    name: 'user',
    // initialState: JSON.parse(localStorage.getItem("snippets")) || [],
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log(action)
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logout: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    }
})

export default authSlice.reducer
export const { addUser, logout } = authSlice.actions
