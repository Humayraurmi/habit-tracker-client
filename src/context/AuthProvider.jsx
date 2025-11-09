import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (name, photoURL) => {
    if (auth.currentUser) {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
        .then(() => {
            setUser(prevUser => ({
                ...prevUser, 
                displayName: name, 
                photoURL: photoURL
            }));
        });
    }
    return Promise.reject(new Error("No user is currently signed in."));
};

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    } 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })

        return()=>{
            unsubscribe()
        }
    },[])

    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle,
        updateUserProfile,
        signOutUser,
        user,
        loading,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;