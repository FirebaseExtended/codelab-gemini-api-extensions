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
