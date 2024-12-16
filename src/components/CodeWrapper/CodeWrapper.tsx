
"use client"
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter , usePathname  } from "next/navigation";

interface CodeWrapperProps {
  children: React.ReactNode; // Content to render if the user is logged in
}

const CodeWrapper: React.FC<CodeWrapperProps> = ({children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
 
  useEffect(() => {
    const verifyToken = async () => {
     
      if (
        pathname === "/" || 
        pathname === "/containerBooking" || 
        pathname === "/forgotPassword" || 
        pathname === "/payment" || 
        pathname === "/search_tracking" || 
        pathname === "/tracking" || 
        pathname === "/updatePassword"
      ) {
        return;
      }

      try {
        // API call to verify token
        const response = await axios.post("/api/verify-token", {
          headers: { token : localStorage.getItem("accessToken") },
        });
        if (response.status === 200) {
          // Redirect to home if already logged in and on login page
          if (pathname === "/login") {
            router.replace("/home");
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        alert("Session expired. Please log in again.");
        router.replace("/login");
      }
    };

    verifyToken();
  }, [router]);


  return <>{children}</>;
};

export default CodeWrapper;