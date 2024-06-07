import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../db/firebase-config"
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'


const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password)

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password)

    const logout = () => signOut(auth)

    const resetPassword = (email) =>
        sendPasswordResetEmail(auth, email)

    // const signInGoogle = () => {
    //     const provider = new GoogleAuthProvider()
    //     signInWithPopup(auth, provider).then(async (result) => {

    //     })
    // }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsuscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        // signInGoogle
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


// import React, { useContext, useState, useEffect } from "react"
// import { auth } from "../db/firebase-config"

// const AuthContext = React.createContext()

// export function useAuth() {
//   return useContext(AuthContext)
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState()
//   const [loading, setLoading] = useState(true)

//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password)
//   }

//   function login(email, password) {
//     return auth.signInWithEmailAndPassword(email, password)
//   }

//   function logout() {
//     return auth.signOut()
//   }

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email)
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email)
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password)
//   }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user)
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     resetPassword,
//     updateEmail,
//     updatePassword
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }
