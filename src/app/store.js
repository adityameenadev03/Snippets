import { configureStore } from '@reduxjs/toolkit'
import snippetReducer from '../reducers/snippetSlice'
import userReducer from '../reducers/authSlice'

  
const store = configureStore({

  reducer: {
    snippets: snippetReducer,
    user:userReducer
  },
  
})


export default store