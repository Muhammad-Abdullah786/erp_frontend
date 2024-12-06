
"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "./client/dashboard/page";
import { useEffect } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { url } from "@/apiURL";

export default function Home() {

  const router = useRouter();

  const check_login = async() => {
    try{
      const response = await axios.post(`${url}/client/verify_token` ,{
        headers :{
            token : localStorage.getItem('token')
        }
      });
      if(response.status === 200){
        console.log(response);
      }
    }
    catch(error){
        router.push('/login')
    }
  }

   useEffect(() => {
    check_login();
   },[]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
