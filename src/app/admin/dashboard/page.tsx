// "use client";
// import { url } from "@/apiURL";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { useRouter } from "next/navigation";
// import { TfiEye } from "react-icons/tfi"; // Eye icon for showing password
// import { RxEyeClosed } from "react-icons/rx"; // Eye closed icon for hiding password


// const RegisterEmployee = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneno: "",
//     address: "",
//     cnic_no: "",
//     profilePic: "",
//     role: "",
//   });

//   const router = useRouter();

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   // States to manage show/hide password functionality
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate that password and confirmPassword match
//     if (formData.password !== formData.confirmPassword) {
//       setAlert({ message: "Passwords do not match!", type: "error" });
//       return;
//     }

//     if (!imageFile) {
//       setAlert({ message: "Please upload an image before registering!", type: "error" });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Upload the image
//       const imageFormData = new FormData();
//       imageFormData.append("file", imageFile);
//       imageFormData.append("upload_preset", "helloWorld");

//       const imageRes = await fetch("https://api.cloudinary.com/v1_1/dr5xqeyrf/image/upload", {
//         method: "POST",
//         body: imageFormData,
//       });

//       const imageData = await imageRes.json();
//       const imageUrl = imageData.secure_url;

//       if (!imageUrl) {
//         throw new Error("Image upload failed");
//       }

//       // Update form data with profile picture URL
//       const updatedFormData = { ...formData, profilePic: imageUrl };

//       // Register the employee
//       const registerRes = await fetch(`${url}/employee/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedFormData),
//       });

//       if (registerRes.ok) {
//         setAlert({ message: "Employee registered successfully!", type: "success" });
//       } else {
//         throw new Error("Failed to register employee");
//       }
//     } catch (error) {
//       console.error(error);
//       setAlert({ message: "An error occurred. Please try again.", type: "error" });
//     } finally {
//       setLoading(false);
//       router.push("/login");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-gray-50 mt-6 p-2">
//       <h1 className="text-2xl text-center font-bold mb-2">Register Employee</h1>
//       {alert && (
//         <Alert variant={alert.type === "error" ? "destructive" : "default"} className="mb-4">
//           <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
//           <AlertDescription>{alert.message}</AlertDescription>
//         </Alert>
//       )}
//       <form onSubmit={handleRegister} className="space-y-4">
//         {/* Username Input */}
//         <div>
//           <Input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Name Input */}
//         <div>
//           <Input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Email Input */}
//         <div>
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Password Input */}
//         <div className="relative">
//           <Input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2"
//           >
//               {showPassword ? <TfiEye />  :  <RxEyeClosed />}
//               </button>
//         </div>
//         {/* Confirm Password Input */}
//         <div className="relative">
//           <Input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword((prev) => !prev)}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2"
//           >
//               {showConfirmPassword ? <TfiEye />  :  <RxEyeClosed />}
//               </button>
//         </div>
//         {/* Phone Number Input */}
//         <div>
//           <Input
//             type="text"
//             name="phoneno"
//             placeholder="Phone Number"
//             value={formData.phoneno}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Address Input */}
//         <div>
//           <Input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* CNIC Number Input */}
//         <div>
//           <Input
//             type="text"
//             name="cnic_no"
//             placeholder="CNIC number"
//             value={formData.cnic_no}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Role Input */}
//         <div>
//           <Input
//             type="text"
//             name="role"
//             placeholder="Role (e.g., Admin, Manager)"
//             value={formData.role}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Profile Picture Upload */}
//         <div>
//           <label className="block font-medium ">Profile Picture</label>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//             required
//           />
//         </div>
//         {/* Register Button */}
//         <Button type="submit" className="w-full mt-1" disabled={loading}>
//           {loading ? "Processing..." : "Register"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default RegisterEmployee;


import React from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import GetEmployees from '@/components/GetEmployees'
const page = () => {
  return (
    <div>
        <AdminNavbar/>
        <GetEmployees/>

    </div>
  )
}

export default page