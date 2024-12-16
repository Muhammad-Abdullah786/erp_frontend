"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.Icon.Default as any;
DefaultIcon.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface DeviceLocation {
  lat: number;
  lng: number;
  speed: number;
}

const Admin_Tracking: React.FC = () => {
  const [devices, setDevices] = useState<Record<string, DeviceLocation[]>>({}); // Record of device ID to historical locations array

  const getAllDevicesLocation = async () => {
    try {
      const response = await axios.get(`https://flespi.io/gw/devices/all/messages`, {
        headers: {
          Authorization: `FlespiToken o2fTkbO5RlrtKDlID7bc6sIibkyXQnqaNT5Br1Xtlb3Ufis06SIDE0weYKY6Dh8A`,
        },
      });
      if (response.status === 200) {
        return response.data?.result;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const postLocationDevice = async (
    id: number,
    lat: number,
    lng: number,
    speed: number
  ) => {
    try {
      // console.log(id)
      const data = [
        {
          protocol: "test",
          latitude: lat,
          longitude: lng,
          speed: speed,
          altitude: 150,
        },
      ];
      const response = await axios.post(
        `https://flespi.io/gw/devices/${id}/messages`,
        data,
        {
          headers: {
            Authorization: `FlespiToken o2fTkbO5RlrtKDlID7bc6sIibkyXQnqaNT5Br1Xtlb3Ufis06SIDE0weYKY6Dh8A`,
          },
        }
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };
   
  useEffect(() => {
    const isReloaded = localStorage.getItem("isReloaded");
    if (!isReloaded) {
      localStorage.setItem("isReloaded", "true");
      window.location.reload();
    }
    // return () => {
    //   localStorage.removeItem("isReloaded");
    // }
  }, []);

  useEffect(() => {
    const loadDeviceData = async () => {
      const devicesData = await getAllDevicesLocation();
      if (devicesData && devicesData.length > 0) {
        const aggregatedDevices = devicesData.reduce(
          (acc: Record<string, DeviceLocation[]>, device: any) => {
            const deviceId = device["device.id"];
            if (!acc[deviceId]) {
              acc[deviceId] = [];
            }
            acc[deviceId].push({
              lat: device.latitude,
              lng: device.longitude,
              speed: device.speed,
            });
            return acc;
          },
          {}
        );

        setDevices(aggregatedDevices);
      }
    };

    loadDeviceData();
  }, []);

  useEffect(() => {
    const simulateDeviceMovement = () => {
      const interval = setInterval(() => {
        setDevices((prevDevices) => {
          const updatedDevices = { ...prevDevices };

          Object.keys(updatedDevices).forEach((id) => {
            const deviceHistory = updatedDevices[id];
            const lastLocation = deviceHistory[deviceHistory.length - 1];

            if (lastLocation) {
              // Simulate smoother and slower movement
              const newLat = lastLocation.lat + (Math.random() - 0.5) * 0.00005; // Smaller steps
              const newLng = lastLocation.lng + (Math.random() - 0.5) * 0.00005;
              const newSpeed = Math.floor(Math.random() * 30) + 5; // Speed range between 5-30 km/h

              // Add the new location to the device's history
              updatedDevices[id] = [
                ...deviceHistory,
                { lat: newLat, lng: newLng, speed: newSpeed },
              ];

              // Post the updated location to the server
              postLocationDevice(parseInt(id), newLat, newLng, newSpeed);
            }
          });

          return updatedDevices;
        });
      }, 2000); // Update every 5 seconds

      return () => {
        clearInterval(interval);
      };
    };

    if (Object.keys(devices).length > 0) {
      simulateDeviceMovement();
    }
  }, [Object.keys(devices).length]); // Run only when devices are initially loaded


  return (
    <div className="h-screen">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.keys(devices).map((id) => (
          <Marker
            key={id}
            position={[devices[id][devices[id].length - 1].lat, devices[id][devices[id].length - 1].lng]}
          >
            <Popup>
              <p>Device ID: {id}</p>
              <p>Speed: {devices[id][devices[id].length - 1].speed} km/h</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Admin_Tracking;