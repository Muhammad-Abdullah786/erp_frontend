"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { updatePasswordRequest } from "@/services/authService";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";


export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token.");
      router.push("/forgot-password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updatePasswordRequest(token, newPassword); // Safe because we checked `token` is not null.
      toast.success("Password updated successfully!");
      router.push("/login");
    } catch (err: any) {
      setError(err?.message || "An error occurred. Please try again.");
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Update Password</h1>
        <p className="text-center mb-6 text-gray-600">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Input with Toggle */}
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showNewPassword ? <RxEyeClosed /> : <TfiEye />}
            </button>
          </div>

          {/* Confirm Password Input with Toggle */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? <RxEyeClosed /> : <TfiEye />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
