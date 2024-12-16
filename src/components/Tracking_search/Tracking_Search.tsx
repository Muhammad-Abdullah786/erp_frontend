"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useStore from '@/store/Zustand_Store'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { url } from '@/apiURL'
const Tracking_Search = () => {

  const router = useRouter();
  const set_tracking_id = useStore((state) => state.set_tracking_id)
  const [search, setsearch] = useState("");
  const [show, setshow] = useState(false);
  
  const handlechange = (e: any) => {
    const value = e.target.value;
    setsearch(value);
    setshow(value.trim() === ""); // Update `show` dynamically based on input
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!search.trim()) {
      setshow(true); // Show red border if the input is empty
      return;
    }
    console.log(search)
    try {
      const response = await axios.post(`${url}/container/tracking_container`, {
        tracking_id: search,
      });
      if (response.status !== 200) {
        console.log(response)
        setshow(true);
        return;
      }
      setshow(false);
      set_tracking_id(search);
      setsearch("");
      router.push(`/tracking`);
    } catch (error) {
        console.log(error)
      setshow(true); // Show red border on error
      setsearch("");
    }
  };

  return (
    <div className='min-h-screen'>
     <form onSubmit={handleSubmit} >
      <div className="h-[450px] flex justify-center items-center ">
          <div className='flex w-full max-w-md items-center space-x-2'>
            <Input className={show ? "border-red-600 border-2" : ""} onChange={(e) => handlechange(e)} value={search}  type="text" placeholder="Enter Tracking ID" />
            <Button type="submit" >Track Now</Button>
          </div>
      </div>
      </form>
    </div>
  )
}

export default Tracking_Search;