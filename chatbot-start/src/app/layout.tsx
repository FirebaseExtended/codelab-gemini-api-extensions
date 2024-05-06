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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLayout from "@/components/nav-layout";
import FirebaseUserProvider from "../lib/firebase-user";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Friendly Conf",
  description: "Build AI-powered web apps with Gemini API Firebase Extensions",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseUserProvider>
          <NavLayout children={children} />
        </FirebaseUserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
