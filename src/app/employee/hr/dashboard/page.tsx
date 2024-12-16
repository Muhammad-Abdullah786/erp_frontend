import React from "react";
import GetEmployees from "@/components/GetEmployees";
import AdminNavbar from "@/components/AdminNavbar";
const page = () => {
  return (
    <div>
<AdminNavbar 
title="HR"
menuItems={[
  { label: "Order Tracking", href: "" },
  { label: "Order Details", href: "/Orders" },
  { label: "Booked container", href: "/containerBooking" },
  
]}/>

      <GetEmployees />
    </div>
  );
};

export default page;