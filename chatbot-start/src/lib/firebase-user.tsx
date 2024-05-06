/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import SignInContainer from "@/components/signin-container";
import "@/lib/firebase.config";

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

/** Firebase Auth user provider */
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
        <div className="flex min-h-screen items-center justify-center text-gray-400">
          <div>Loading...</div>
        </div>
      )}
    </FirebaseUserContext.Provider>
  );
};

export default FirebaseUserProvider;
