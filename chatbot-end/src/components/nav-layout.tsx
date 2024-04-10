"use client";

import React, { useContext, useState } from "react";
import { FirebaseUserContext } from "@/lib/firebase-user";

export interface NavLayoutProps {
  children: React.ReactNode;
}

/**
 * A React layout with a toolbar with:
 * - navigation on the left side, populated from 'navItems' array: Home | Gallery
 * - user dropdown menu, on the right side: Username > Profile | Logout
 *
 * Using Tailwind for all styling.
 */
const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useContext(FirebaseUserContext);

  const navItems = [
    { name: "Home", href: "/chat" },
    { name: "Gallery", href: "/gallery" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-baseline space-x-4">
                {navItems.map(({ name, href }, key) => (
                  <a
                    key={key}
                    href={href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div>
                  <button
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user.currentUser?.displayName || user?.currentUser?.uid}
                    {user.currentUser?.photoURL && (
                      <img
                        className="ml-2 h-8 w-8 rounded-full"
                        src={user.currentUser.photoURL}
                        alt="User Avatar"
                      />
                    )}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-400">
                      uid: {user.currentUser?.uid}
                    </div>
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={user.signOut}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      {children}
    </div>
  );
};

export default NavLayout;
