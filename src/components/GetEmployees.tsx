"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import ShadCN Button component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Import ShadCN Table components
import { RxReload } from "react-icons/rx";
import { url } from '@/apiURL'; // Assuming `url` is your base API URL

// Employee Interface
interface Employee {
  _id: string;
  name: string;
  email: string;
  phoneNumber: {
    internationalNumber: string;
  };
  role: string; // Optional since not all employees may have this
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

export default function GetEmployees() {
  // Use SWR to fetch employee data
  const { data, error, isLoading } = useSWR(`${url}/get_employees`, fetcher);

  console.log('suzair', data);
  // Handle employee data
  const employees: Employee[] = data?.employees || [];

  return (
    <div className="container min-h-screen mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Show loading state */}
      {isLoading && <p><RxReload className="animate-spin text-2xl" /></p>}

      {/* Show error message */}
      {error && <p className="text-red-500">{error.message || "Something went wrong"}</p>}

      {/* Employee Table */}
      {!isLoading && !error && employees.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Roles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  {/* Render the phone number correctly */}
                  <TableCell>{employee.phoneNumber?.internationalNumber || "N/A"}</TableCell>
                  <TableCell>{employee.role || "N/A"}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Show no data message */}
      {!isLoading && !error && employees.length === 0 && <p>No employees found.</p>}
    </div>
  );
}
