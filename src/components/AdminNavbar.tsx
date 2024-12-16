"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/navigation"; // For redirecting to login
import "../app/globals.css";

interface MenuItem {
  label: string;
  href: string;
}

interface AdminNavbarProps {
  title: string;
  menuItems: MenuItem[];
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ title, menuItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // State to show the confirmation dialog
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-md">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            {/* Menu Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>

        <div className="text-xl font-semibold text-gray-800">
          <Link href="#">{title}</Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Notifications Icon with Badge */}
          <button className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center bg-gray-300 px-4 py-3 shadow-md">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="p-4 space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {/* Logout Button */}
          <li
            className="px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer"
            onClick={() => setShowLogoutDialog(true)}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar when open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Confirmation Dialog for Logout */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => setShowLogoutDialog(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;