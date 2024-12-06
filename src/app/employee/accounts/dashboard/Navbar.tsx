"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  
} from '@/components/ui/dialog'; // Import shadcn components
import {Button } from '@/components/ui/button'
const Navbar = () => {
  const [open, setOpen] = useState(false); // state for dialog
  const router = useRouter();

  const handleLogout = () => {
    // Remove token (or perform any clean-up action)
    localStorage.removeItem('token'); // Assuming you're using localStorage for token
    router.push('/login'); // Redirect to login page
  };

  const handleOpenDialog = () => {
    setOpen(true); // Open the confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the confirmation dialog
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      {/* Left side: Logo */}
      <h1 className="text-2xl font-bold">LogisticsCo</h1>


      {/* Middle: Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <a className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a  className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a  className="hover:underline">
            Services
          </a>
        </li>
      </ul>

      {/* Right side: Logout Button */}
      <div>
        <Button
          onClick={handleOpenDialog}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </Button>
      </div>

      {/* Dialog box for confirmation using shadcn/ui */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* This can be your logout button, but since you are manually controlling the dialog, you can remove this */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to log out?</p>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              No
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>  
  );
};

export default Navbar;
