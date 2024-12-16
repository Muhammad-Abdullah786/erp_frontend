import React from "react";
import Orders from "@/components/Orders";
import AdminNavbar from "@/components/AdminNavbar";
const page = () => {
  return (
    <div>
      <AdminNavbar
        title="Sales"
        menuItems={[{ label: "Marketing", href: "" }]}
      />
      <Orders />
    </div>
  );
};

export default page;
