"use client";
import { useState } from "react";
import { Truck, Ship, Package, Globe, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container_Book from "@/components/Container-Book/Container_Book";

export default function ContainerShippingService() {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return <div className="min-h-screen bg-gray-100">
      {showBookingForm ? (
    // Show the Container_Book form
    <Container_Book />
  ) :   (
<>
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Global Container Shipping Solutions
          </h1>
          <p className="text-xl mb-8">
            Transport your goods across countries with our reliable container
            shipping services
          </p>
          <Button
            onClick={() => setShowBookingForm(true)}
            size="lg"
            variant="secondary"
          >
            Rent a Container
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ship className="mr-2" /> Sea Freight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Efficient container shipping across oceans, connecting
                  continents with your cargo.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2" /> Truck Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seamless inland transportation of containers to and from
                  ports, ensuring door-to-door delivery.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p>
                Connect with markets worldwide through our extensive shipping
                network.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p>
                Reliable schedules and efficient routes to ensure your cargo
                arrives on time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transport</h3>
              <p>
                State-of-the-art tracking and security measures to protect your
                shipments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-xl mb-8">
            Rent our containers and start moving your goods across the globe
            today.
          </p>
          <Button size="lg">
            <Package className="mr-2" /> Rent a Container Now
          </Button>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-800 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">Email: info@containershipper.com</p>
          <p className="mb-2">Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Shipping Lane, Port City, Ocean State 12345</p>
        </div>
      </section>
      </>
  )}
    </div>
  
}
