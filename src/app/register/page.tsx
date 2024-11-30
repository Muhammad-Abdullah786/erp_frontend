"use client";
import { url } from "@/apiURL";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { registerClient } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify"; // Toast notification
import { TfiEye } from "react-icons/tfi"; // Eye icon for showing password
import { RxEyeClosed } from "react-icons/rx"; // Eye closed icon for hiding password

export default function RegisterPage() {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    cnicOrPassport: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  const router = useRouter();

  const {
    trigger: register,
    isMutating: isLoading,
    error,
  } = useSWRMutation(`${url}/client/register`, async (_, { arg }) => {
    try {
      const data = await registerClient(arg);
      // Store the token in localStorage after successful registration
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token
      }
      toast.success("Registration successful! Redirecting to dashboard...");
      setTimeout(() => router.push("/home"), 1500); // Redirect to dashboard
      return data;
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    register(formData);
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <RxEyeClosed /> : <TfiEye />}
            </button>
          </div>

          <div className="relative">
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? <RxEyeClosed /> : <TfiEye />}
            </button>
          </div>

          <Input
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />

          <Input
            name="cnicOrPassport"
            placeholder="Enter your CNIC or passport number"
            value={formData.cnicOrPassport}
            onChange={handleChange}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Registering..." : "Register"}
          </Button>

          {error && <p className="text-red-500">{error.message}</p>}

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
