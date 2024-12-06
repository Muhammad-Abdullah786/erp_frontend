import React from "react";
import Navbar from "./Navbar";
import GetEmployees from "@/components/GetEmployees";
const page = () => {
  return (
    <div>
      <Navbar />
      <GetEmployees />
    </div>
  );
};

export default page;
