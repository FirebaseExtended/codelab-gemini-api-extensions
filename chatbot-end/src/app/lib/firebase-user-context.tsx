"use client";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./firebase.config";
import SignInContainer from "@/components/signin-container";

export interface FirebaseUser {
  isLoading?: boolean;
  isSignedIn?: boolean;
  currentUser?: User | null;
  signInWithGoogle?: () => Promise<UserCredential>;
  signOut?: () => Promise<void>;
}

export const FirebaseUserContext = React.createContext<FirebaseUser>({
  isLoading: true,
});

export interface FirebaseUserProviderProps {
  children: React.ReactNode;
}

/** Firebase Auth current user provider */
const FirebaseUserProvider: React.FC<FirebaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser>({ isLoading: true });
  const auth = getAuth();

  useEffect(() => {
    const signInWithGoogle = () =>
      signInWithPopup(auth, new GoogleAuthProvider());
    const signOut = () => auth.signOut();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase auth current user changed", currentUser);
      setUser({
        currentUser,
        isLoading: false,
        isSignedIn: !!currentUser,
        signInWithGoogle,
        signOut,
      });
    });
    return unsubscribe;
  }, [auth]);

  return (
    <FirebaseUserContext.Provider value={user}>
      {user?.isSignedIn === true && children}
      {user?.isSignedIn === false && <SignInContainer />}
      {user?.isLoading && (
        <div className="flex text-center mt-5 text-xl font-bold text-gray-500 w-full justify-center items-center h-full">
          Loading...
        </div>
      )}
    </FirebaseUserContext.Provider>
  );
};

export default FirebaseUserProvider;
