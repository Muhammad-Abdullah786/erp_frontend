"use client";
import { RxEyeClosed } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation"; // For redirection
import { loginClient } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify"; // Toast notification
import { TfiEye } from "react-icons/tfi";
import { url } from "@/apiURL";

export default function LoginPage() {
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const router = useRouter();

  const {
    trigger: login,
    isMutating: isLoading,
    error,
  } = useSWRMutation(`${url}/client/login`, async (_, { arg }) => {
    try {
      const data = await loginClient(arg);
      // Store the token in local storage
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token
      }
      toast.success("Login successful! Redirecting to Home page");
      router.push("/home"); // Redirect to dashboard
      return data;
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      {" "}
      {/* Center vertically */}
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
        {" "}
        {/* Form container */}
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <RxEyeClosed /> : <TfiEye />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-end">
            <Link
              className="text-sm text-blue-600 underline hover:unset"
              href="/forgotPassword"
            >
              Forgot Password
            </Link>
          </div>

          {error && <p className="text-red-500">{error.message}</p>}

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
