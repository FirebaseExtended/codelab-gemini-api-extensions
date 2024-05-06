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

import React, { useContext } from "react";
import { FirebaseUserContext } from "@/lib/firebase-user";

/**
 * Sign in with Google button, using Firebase Auth
 *
 * Using Tailwind for all styling.
 */
const SignInContainer: React.FC<{}> = ({}) => {
  const user = useContext(FirebaseUserContext);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          type="button"
          onClick={user.signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInContainer;
