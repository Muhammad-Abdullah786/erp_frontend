import React from "react";
import AdminNavbar from '@/components/AdminNavbar'
import GetEmployees from "@/components/GetEmployees";
const page = () => {
  return (
    <div>
      <AdminNavbar
        title="Admin Panel"
        menuItems={[
          { label: "Add Employees", href: "/employeeRegister" },
          { label: "Employees List", href: "/GetEmployee" },
          { label: "Container Tracking", href: "/admin/tracking" },
        ]}
      />
      <GetEmployees/>
    </div>
  )
}

export default page
