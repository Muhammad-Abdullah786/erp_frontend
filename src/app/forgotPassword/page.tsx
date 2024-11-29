"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { resetPasswordRequest } from "@/services/authService"; // Ensure this exists

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const [error, setError] = useState<string | null>(null); // To manage error state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Using the custom resetPasswordRequest function to call your API
      await resetPasswordRequest(email);
      toast.success("Password reset email sent! Please check your inbox.");
      router.push("/login"); // Redirect to login after success
    } catch (err: any) {
      setError(err?.message || "An error occurred. Please try again.");
      toast.error("Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Forgot Password</h1>
        <p className="text-center mb-6 text-gray-600">
          Enter your email address to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
