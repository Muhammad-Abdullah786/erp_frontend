// app/components/Navbar.tsx
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirection

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if tokens exist in localStorage when the component is mounted
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // If both tokens exist, user is logged in
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Separate function for handling logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); // Update the logged-in state
    router.push("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-600 text-white h-20 flex items-center justify-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-bold">LogisticsCo</Link>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About Us</a></li>
          <li><a href="/services" className="hover:underline">Services</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <button 
              onClick={logout} 
              className="bg-white hover:opacity-85 transition-all text-black py-2 px-4 rounded-md"
            >
              Log Out
            </button>
          ) : (
            <Link href="/login" className="bg-white hover:opacity-85 transition-all text-black py-2 px-4 rounded-md">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
