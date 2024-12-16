// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Truck, Ship, Shield, Clock, Globe } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Container_Book from "@/components/Container-Book/Container_Book";
// import { Sidebar } from "@/components/Sidebar/sidebar";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog"; // Assuming shadcn dialog component
// import Link from 'next/link'
// export default function HomePage() {
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control confirmation dialog
//   const [showAuthModal, setShowAuthModal] = useState(false); // State for signup/login modal
//   const router = useRouter();

//   // Check if token is in localStorage and update login status
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true); // Set isLoggedIn to true if token exists
//     }
//   }, []); // Only run once on component mount

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token from localStorage
//     router.push("/login"); // Redirect to login page
//   };



//   const services = [
//     {
//       icon: Ship,
//       title: "Sea Freight",
//       description:
//         "Efficient container shipping across oceans, connecting continents with your cargo.",
//       image: "/ship.avif", // Replace with your actual image URL
//     },
//     {
//       icon: Truck,
//       title: "Truck Transportation",
//       description:
//         "Seamless inland transportation of containers to and from ports, ensuring door-to-door delivery.",
//       image: "/truck.avif", // Replace with your actual image URL
//     },
//   ];

//   const whyChooseUs = [
//     {
//       icon: Globe,
//       title: "Global Reach",
//       description:
//         "Connect with markets worldwide through our extensive shipping network.",
//       image: "/global.avif", // Replace with your actual image URL
//     },
//     {
//       icon: Clock,
//       title: "Timely Delivery",
//       description:
//         "Reliable schedules and efficient routes to ensure your cargo arrives on time.",
//       image: "/delivery.avif", // Replace with your actual image URL
//     },
//     {
//       icon: Shield,
//       title: "Secure Transport",
//       description:
//         "State-of-the-art tracking and security measures to protect your shipments.",
//       image: "/secure.avif", // Replace with your actual image URL
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* <Sidebar /> */}
//       {showBookingForm ? (
//         <Container_Book />
//       ) : (
//         <div className="transition-all duration-300">
//           <section id="services" className="py-10 bg-white">
//             <div className="container mx-auto">
//               <div className="flex items-center justify-between mb-12">
//                 <h2 className="text-3xl font-bold text-center">Our Services</h2>
//                 <Link href={'/containers_details'} className="text-blue-500 hover:underline text-lg">Booked Containers</Link>
//                 {isLoggedIn && ( // Conditionally render Logout button
//                   <Button onClick={() => setIsDialogOpen(true)}>Logout</Button>
//                 )}
//               </div>
//               <section id="rent" className= "rounded-lg my-10 py-16 bg-blue-50">
//             <div className="container mx-auto text-center">
//               <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
//               <p className="text-xl mb-8">
//                 Rent our containers and start moving your goods across the globe
//                 today.
//               </p>
//               <Link
//               href={"/containerBooking"}
              
//                 className="font-semibold p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
//               >
//                 Rent a Container Now
//               </Link>
//             </div>
//           </section>
//               <div className="space-y-12">
//                 {services.map((service, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col md:flex-row items-center gap-8"
//                   >
//                     <div className="md:w-1/2 space-y-4">
//                       <service.icon className="w-12 h-12 text-blue-600" />
//                       <h3 className="text-2xl font-semibold">
//                         {service.title}
//                       </h3>
//                       <p>{service.description}</p>
//                     </div>
//                     <div className="md:w-1/2">
//                       <img
//                         src={service.image}
//                         alt={service.title}
//                         className="w-full h-auto rounded-lg shadow-md"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           <section id="why-us" className="bg-gray-100 py-16">
//             <div className="container mx-auto">
//               <h2 className="text-3xl font-bold text-center mb-12">
//                 Why Choose Us
//               </h2>
//               <div className="space-y-12">
//                 {whyChooseUs.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`flex flex-col md:flex-row items-center gap-8 ${
//                       index % 2 === 0 ? "md:flex-row-reverse" : ""
//                     }`}
//                   >
//                     <div className="md:w-1/2 space-y-4">
//                       <item.icon className="w-12 h-12 text-blue-600" />
//                       <h3 className="text-2xl font-semibold">{item.title}</h3>
//                       <p>{item.description}</p>
//                     </div>
//                     <div className="md:w-1/2">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-auto rounded-lg shadow-md"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

         
//         </div>
//       )}

//       {/* Logout Confirmation Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>Confirm Logout</DialogHeader>
//           <p>Are you sure you want to logout?</p>
//           <DialogFooter>
//             <Button onClick={handleLogout} className="bg-red-500">
//               Yes, Logout
//             </Button>
//             <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
//               No, Cancel
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

    
//     </div>
//   );
// }

import AdminNavbar from '@/components/AdminNavbar'
import React from 'react'
import Client_Container_History from '@/components/Client_Container_History/Client_Container_History'
const Userdashboard = () => {
  return (
    <div className='min-h-screen'>
    <AdminNavbar
       title="Welcome Back!"
       menuItems={[
         { label: "Order Tracking", href: "/search_tracking" },
         { label: "Book a container", href: "/containerBooking" },
         
       ]}/>
    
    <div className="">
      <h1 className=''>Your Orders</h1>
      <Client_Container_History/>
    </div>
    </div>
  )
}

export default Userdashboard

