import React, { createContext, useState } from 'react';
import app from '../firebase/firebase.init';
import { getAuth, updateProfile, sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
const auth = getAuth(app);

export const AuthContext = createContext();
const UserContext = ({ children }) => {

    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const veryfyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('check your Email')
            });
    }
    const updateProfileName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        }).then(() => {
            console.log('user name update');
        }).catch((error) => {
            console.log(error);
        });
    }
    const updatePassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('cheack your Email')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    }

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
        });
    }
    const [user, setUser] = useState({});
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
            //console.log('Auth changed', currentUser);
        });
        return () => {
            unsub()
        }
    }, [])

    const authInfo = { createUser, updatePassword, loginUser, veryfyEmail, updateProfileName, logOut, user, loading }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;