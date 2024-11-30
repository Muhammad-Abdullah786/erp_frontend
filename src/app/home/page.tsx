"use client";

import { useState } from "react";
import { Truck, Ship, Shield, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container_Book from "@/components/Container-Book/Container_Book";
import { Sidebar } from "@/components/Sidebar/sidebar";

export default function HomePage() {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const services = [
    {
      icon: Ship,
      title: "Sea Freight",
      description:
        "Efficient container shipping across oceans, connecting continents with your cargo.",
      image: "/ship.avif", // Replace with your actual image URL
    },
    {
      icon: Truck,
      title: "Truck Transportation",
      description:
        "Seamless inland transportation of containers to and from ports, ensuring door-to-door delivery.",
      image: "/truck.avif", // Replace with your actual image URL
    },
  ];

  const whyChooseUs = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Connect with markets worldwide through our extensive shipping network.",
      image: "/global.avif", // Replace with your actual image URL
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Reliable schedules and efficient routes to ensure your cargo arrives on time.",
      image: "/deilivery.avif", // Replace with your actual image URL
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description:
        "State-of-the-art tracking and security measures to protect your shipments.",
      image: "/secure.avif", // Replace with your actual image URL
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      {showBookingForm ? (
        <Container_Book />
      ) : (
        <div className=" transition-all duration-300">
          <section id="services" className="py-16 bg-white">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Services
              </h2>
              <div className="space-y-12">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="md:w-1/2 space-y-4">
                      <service.icon className="w-12 h-12 text-blue-600" />
                      <h3 className="text-2xl font-semibold">
                        {service.title}
                      </h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="why-us" className="bg-gray-100 py-16">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose Us
              </h2>
              <div className="space-y-12">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="md:w-1/2 space-y-4">
                      <item.icon className="w-12 h-12 text-blue-600" />
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="rent" className="py-16 bg-blue-50">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
              <p className="text-xl mb-8">
                Rent our containers and start moving your goods across the globe
                today.
              </p>
              <Button
                size="lg"
                onClick={() => setShowBookingForm(true)}
                className="font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Rent a Container Now
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { Truck, Ship, Package, Globe, Clock, Shield } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Container_Book from "@/components/Container-Book/Container_Book";
// import { Sidebar } from "@/components/Sidebar/sidebar";

// export default function ContainerShippingService() {
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const carouselImages = [
//     "/placeholder.svg?height=600&width=1200&text=Global Shipping",
//     "/placeholder.svg?height=600&width=1200&text=Container Transport",
//     "/placeholder.svg?height=600&width=1200&text=Logistics Solutions",
//     "/placeholder.svg?height=600&width=1200&text=Worldwide Delivery",
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Sidebar />
//       {showBookingForm ? (
//         <Container_Book />
//       ) : (
//         <div className="md:pl-64 transition-all duration-300">
//           <section id="home" className="relative bg-blue-600 text-white py-20">
//             <div className="absolute inset-0 overflow-hidden">
//               {carouselImages.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
//                     index === currentSlide ? "opacity-20" : "opacity-0"
//                   }`}
//                 />
//               ))}
//             </div>
//             <div className="container mx-auto text-center relative z-10">
//               <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
//                 Global Container Shipping Solutions
//               </h1>
//               <p className="text-xl mb-8 animate-fade-in-up">
//                 Transport your goods across countries with our reliable
//                 container shipping services
//               </p>
//               <Button
//                 onClick={() => setShowBookingForm(true)}
//                 size="lg"
//                 variant="secondary"
//                 className="font-semibold animate-pulse"
//               >
//                 Request a Quote
//               </Button>
//             </div>
//           </section>

//           <section id="services" className="py-16 bg-white">
//             <div className="container mx-auto">
//               <h2 className="text-3xl font-bold text-center mb-12">
//                 Our Services
//               </h2>
//               <div className="grid md:grid-cols-2 gap-8">
//                 <Card className="bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                   <CardHeader>
//                     <CardTitle className="flex items-center text-2xl text-blue-600">
//                       <Ship className="mr-2" /> Sea Freight
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <CardDescription className="text-base">
//                       Efficient container shipping across oceans, connecting
//                       continents with your cargo.
//                     </CardDescription>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                   <CardHeader>
//                     <CardTitle className="flex items-center text-2xl text-blue-600">
//                       <Truck className="mr-2" /> Truck Transportation
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <CardDescription className="text-base">
//                       Seamless inland transportation of containers to and from
//                       ports, ensuring door-to-door delivery.
//                     </CardDescription>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </section>

//           <section id="why-us" className="bg-gray-100 py-16">
//             <div className="container mx-auto">
//               <h2 className="text-3xl font-bold text-center mb-12">
//                 Why Choose Us
//               </h2>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {[
//                   {
//                     icon: Globe,
//                     title: "Global Reach",
//                     description:
//                       "Connect with markets worldwide through our extensive shipping network.",
//                   },
//                   {
//                     icon: Clock,
//                     title: "Timely Delivery",
//                     description:
//                       "Reliable schedules and efficient routes to ensure your cargo arrives on time.",
//                   },
//                   {
//                     icon: Shield,
//                     title: "Secure Transport",
//                     description:
//                       "State-of-the-art tracking and security measures to protect your shipments.",
//                   },
//                 ].map((item, index) => (
//                   <Card
//                     key={index}
//                     className="bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                   >
//                     <CardContent className="pt-6">
//                       <div className="flex flex-col items-center text-center">
//                         <item.icon className="w-12 h-12 text-blue-600 mb-4" />
//                         <h3 className="text-xl font-semibold mb-2">
//                           {item.title}
//                         </h3>
//                         <p>{item.description}</p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </section>

//           <section id="gallery" className="py-16 bg-white">
//             <div className="container mx-auto">
//               <h2 className="text-3xl font-bold text-center mb-12">
//                 Our Global Network
//               </h2>
//               <div className="relative w-full max-w-4xl mx-auto h-80 overflow-hidden rounded-lg shadow-lg">
//                 {[...Array(5)].map((_, index) => (
//                   <img
//                     key={index}
//                     src={`/placeholder.svg?height=400&width=600&text=Port ${
//                       index + 1
//                     }`}
//                     alt={`Port ${index + 1}`}
//                     className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
//                       index === currentSlide ? "opacity-100" : "opacity-0"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </section>

//           <section id="rent" className="py-16 bg-blue-50">
//             <div className="container mx-auto text-center">
//               <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
//               <p className="text-xl mb-8">
//                 Rent our containers and start moving your goods across the globe
//                 today.
//               </p>
//               <Button
//                 size="lg"
//                 onClick={() => setShowBookingForm(true)}
//                 className="font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
//               >
//                 <Package className="mr-2" /> Rent a Container Now
//               </Button>
//             </div>
//           </section>

//           <section id="contact" className="bg-gray-800 text-white py-12">
//             <div className="container mx-auto text-center">
//               <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
//               <p className="mb-2">Email: info@containershipper.com</p>
//               <p className="mb-2">Phone: +1 (555) 123-4567</p>
//               <p>Address: 123 Shipping Lane, Port City, Ocean State 12345</p>
//             </div>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// }
