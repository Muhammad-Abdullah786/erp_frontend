"use client";
import { url } from "@/apiURL";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWRMutation from "swr/mutation";
import { registerEmployee } from "@/services/authService"; // Add this function in services

export default function RegisterEmployee() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "Abbasi@123",
    role: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Registration mutation
  const {
    trigger: registerForm,
    isMutating,
    error,
  } = useSWRMutation(`${url}/register`, async (_, { arg }) => {
    try {
      const { name, email, phoneNumber, password, role, consent } = arg;

      const data = await registerEmployee(
        name,
        email,
        phoneNumber,
        password,
        role,
        consent
      );
      toast.success("Employee registered successfully!");
      console.log("Employee data", data);
      return data;
    } catch (err) {
      toast.error("Failed to register employee. Please try again.");
      throw err;
    }
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle form submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.role
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    // Before calling registerForm(formData)
    console.log("Form Data:", formData);

    // Call register mutation
    registerForm(formData);
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
        {/* <ToastContainer /> */}
        <h1 className="text-3xl font-bold mb-4 text-center">
          Register Employee
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="hidden"
          />

          <Input
            name="role"
            type="text"
            placeholder="Role (e.g., Hr, Sales, Accounts)"
            value={formData.role}
            onChange={handleInputChange}
            required
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mr-2 hidden"
              required
            />
            <label className="text-sm hidden">
              I consent to the terms and conditions
            </label>
          </div>

          <Button type="submit" disabled={isMutating} className="w-full">
            {isMutating ? "Processing..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
