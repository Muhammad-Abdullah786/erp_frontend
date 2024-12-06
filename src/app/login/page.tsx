"use client";
import { RxEyeClosed } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation"; // For redirection
import { loginClient, loginAdmin, loginEmployee } from "@/services/authService"; // Import login functions
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify"; // Toast notification
import { TfiEye } from "react-icons/tfi";

export default function LoginPage() {
  const [formData, setFormData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [role, setRole] = useState("client"); // Default role

  const router = useRouter();

  // Function to handle login based on role
  const loginFunction = async (credentials: { username: string; password: string }) => {
    if (role === "client") {
      return loginClient(credentials);
    } else if (role === "admin") {
      return loginAdmin(credentials);
    } else if (role === "employee") {
      // Fetch employee data (including the role) during login
      const employeeData = await loginEmployee(credentials);
      return employeeData; // This should contain role information, like "Hr" in your case
    }
  };

  // Login mutation
  const {
    trigger: login,
    isMutating: isLoading,
    error,
  } = useSWRMutation('login', async (_, { arg }) => {
    try {
      const data = await loginFunction(arg);
      
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token
      }
      console.log("DATA",data)
      
      // Check if the user is an employee and has a role
      if (role === "employee") {
        toast.success("Login successful! Redirecting to employee dashboard");
        router.push(`employee/${data.employee.role.toLowerCase()}/dashboard`); // Redirect based on the employee's role
      
      } else {
        toast.success("Login successful! Redirecting to dashboard");
        router.push(`${role}/dashboard`); // For admin or client login
      }

      return data;
    } catch (err) {
      toast.error("Login failed. Please try again.");
      throw err; // This will trigger the error handling in SWRMutation
    }
  });

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if username and password are filled
    if (!formData.username || !formData.password) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Proceed to login if all fields are filled
    login(formData);
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
        {/* Tabs section */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setRole("admin")}
            className={`py-2 px-4 rounded ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("client")}
            className={`py-2 px-4 rounded ${role === "client" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Client
          </button>
          <button
            onClick={() => setRole("employee")}
            className={`py-2 px-4 rounded ${role === "employee" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Employee
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="username"
            type="text"
            placeholder={`Username`}
            value={formData.username}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <TfiEye /> : <RxEyeClosed />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-end">
            <Link className="text-sm text-blue-600 underline hover:unset" href="/forgotPassword">
              Forgot Password
            </Link>
          </div>


          {role === "client" && (
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 underline hover:text-blue-800">
                Sign up
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
