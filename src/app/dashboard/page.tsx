"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check for the token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if no token found
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Show a success message
    toast.success("Successfully logged out!");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Dashboard</h1>
      hello
      {/*       
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" onClick={() => setIsDialogOpen(true)}>Logout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>Are you sure you want to logout? This action cannot be undone.</DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>Yes, Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
