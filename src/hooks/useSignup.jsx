import { useState } from 'react'
import { addUser } from "../reducers/authSlice";
import { useSelector, useDispatch } from 'react-redux'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

import auth from '../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const dispatch = useDispatch()
    // const user = useSelector(store => store.user.user)

    // console.log(user)
    const signup = async (email, password) => {
        console.log("called")
        setIsLoading(true)
        setError(null)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                const { email, emailVerified, displayName, phoneNumber, uid } = user
                const data = {
                    email,
                    emailVerified,
                    displayName,
                    phoneNumber,
                    uid
                }
                console.log(email, emailVerified, displayName, phoneNumber, uid)
                if (user) {
                    dispatch(addUser({ email, emailVerified, displayName, phoneNumber, uid }))
                }
                setIsLoading(false)
                setIsLoading(false)

                // Add a new document with a generated id.

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoading(false)
                setError(error)
                // ..
            });
    }

    return { signup, isLoading, error }
}