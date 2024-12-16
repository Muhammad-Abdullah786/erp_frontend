"use client"; // If you're using Next.js 13+ in the app directory

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import useStore from "@/store/Zustand_Store";
const DefaultIcon = L.Icon.Default as any;
DefaultIcon.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Tracking_container = () => {

  const tracking_id = useStore((state) => state.tracking_id )

  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194, speed: 0 });

  const get_devices_location = async () => {
    try {
      const response = await axios.get(`https://flespi.io/gw/devices/${tracking_id}/messages`,
        {
          headers: {
            Authorization: `FlespiToken o2fTkbO5RlrtKDlID7bc6sIibkyXQnqaNT5Br1Xtlb3Ufis06SIDE0weYKY6Dh8A`
          }
        }
      );
      if(response.status === 200){
        return response.data?.result;
      }
    }
     
    catch (e) {
      console.log(e);
    }
  }

  const post_locaiton_devices = async ( lat : number , long : number , speed : number) => {
    try {
      const data = [
        {
          protocol: "test",
          latitude: lat,
          longitude: long,
          speed: speed,
          altitude: 150,
        },
      ];
      const response = await axios.post(`https://flespi.io/gw/devices/6112954/messages`, data,
        {
          headers: {
            Authorization: `FlespiToken o2fTkbO5RlrtKDlID7bc6sIibkyXQnqaNT5Br1Xtlb3Ufis06SIDE0weYKY6Dh8A`
          }
        }
      );
      if (response.status === 200) {
        return response
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const isReloaded = localStorage.getItem("isReloaded");
    if (!isReloaded) {
      localStorage.setItem("isReloaded", "true");
      window.location.reload();
    }
    return () => {
      localStorage.removeItem("isReloaded");
    }
  }, []);

  useEffect(() => {
    
      const interval = setInterval(async() => {
         // Simulate random movement and speed
      const newLat = location.lat + (Math.random() - 0.5) * 0.0001;
      const newLng = location.lng + (Math.random() - 0.5) * 0.0001;
      const speed = Math.floor(Math.random() * 50);
        try{
             const post = await  post_locaiton_devices(newLat , newLng , speed);
             console.log(post);
             const get = await get_devices_location();
             console.log(get[get.length - 1])
             if (get && get.length > 0) {
              const lastObject = get[get.length - 1]; // Get the last object in the array
              setLocation({
                lat: lastObject.latitude,
                lng: lastObject.longitude,
                speed: lastObject.speed,
              });
            } else {
              console.warn("No data available in the result array.");
            }
        }
        catch(e){
           console.log(e);
        }
    }, 3000);
    return () => {
      clearInterval(interval); // Cleanup interval
    } 

   
    // const interval = setInterval(() => {
    //   setLocation((prev) => ({
    //     lat: prev.lat + (Math.random() - 0.5)  * 0.0001,
    //     lng: prev.lng + (Math.random() - 0.5)  * 0.0001,
    //     speed : Math.floor(Math.random() * 100)
    //   }));
    // }, 2000);
    // return () => {
    //   clearInterval(interval); // Cleanup interval
    // } 
  }, []);

  return (
    <>
      <div className="h-screen ">
        <MapContainer
          //  key={`${location.lat}-${location.lng}`}
          center={[location.lat, location.lng]} // Initial map center
          zoom={13}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup ><p>Speed: {location.speed} km/h</p></Popup>
          </Marker>
        </MapContainer>
      </div>
    </>

  )
}

export default Tracking_container