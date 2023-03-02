import { useState } from 'react'
import { addUser } from "../reducers/authSlice";
import { useSelector, useDispatch } from 'react-redux'

import auth from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
console.log(auth)

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)

    console.log(user)
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const {email, emailVerified, displayName,phoneNumber,uid} = user
                // if (user) {
                //     dispatch(addUser(user))
                // }
                // setIsLoading(false)
                console.log(email, emailVerified,displayName,phoneNumber,uid)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoading(false)
                setError(error)
            });
    }

    return { login, isLoading, error }
}