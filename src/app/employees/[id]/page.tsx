"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { url } from "@/apiURL";

interface Employee {
  id: number;
  username: string;
  email: string;
  phoneno: string;
  address: string;
  cnic_no: string;
  profilePic?: string; // Optional
}

export default function EditEmployee() {
  const { id } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch employee details by ID for pre-filling the form
  useEffect(() => {
    if (!id) return;
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${url}/employee/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee details.");
        }
        const data = await response.json();
        const empData: Employee = data.employee;
        setEmployee(empData);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form submission for updating the employee
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    setLoading(true);

    try {
      let profilePic = employee.profilePic;

      // If a new image file is uploaded, upload it to Cloudinary
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "helloWorld"); // Replace with your Cloudinary upload preset

        const imageRes = await fetch("https://api.cloudinary.com/v1_1/dr5xqeyrf/image/upload", {
          method: "POST",
          body: formData,
        });

        const imageData = await imageRes.json();
        profilePic = imageData.secure_url;

        if (!profilePic) {
          throw new Error("Image upload failed.");
        }
      }

      // Update the employee details with the new/old profile picture URL
      const updatedEmployee = { ...employee, profilePic };

      const response = await fetch(`${url}/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee.");
      }

      router.push(`/employees/${id}`); // Redirect to the employee details page
    } catch (err: any) {
      alert(err.message || "Something went wrong while updating the employee.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  // Handle dialog close (logout confirmation)
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="container mx-auto p-6">
      <Button variant="outline" onClick={() => router.push(`/GetEmployee`)}>
        Back to Employee Details
      </Button>
      <h1 className="text-2xl font-bold my-4">Edit Employee</h1>

      {loading && <p>Loading employee details...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {employee && (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={employee.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneno" className="block font-medium">
              Phone Number
            </label>
            <Input
              type="text"
              id="phoneno"
              name="phoneno"
              value={employee.phoneno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block font-medium">
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={employee.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cnic_no" className="block font-medium">
              CNIC
            </label>
            <Input
              type="text"
              id="cnic_no"
              name="cnic_no"
              value={employee.cnic_no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profilePic" className="block font-medium">
              Profile Picture
            </label>
            {employee.profilePic && (
              <img
                src={employee.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-2"
              />
            )}
            <Input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>

          <Button variant="secondary" className="hover:bg-black hover:text-white" type="submit">
            Save Changes
          </Button>
        </form>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpenDialog(true)}>
            Logout
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
