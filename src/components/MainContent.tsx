// app/components/MainContent.tsx

export default function MainContent() {
    return (
      <div className="bg-white p-8 min-h-[calc(100vh-16px)]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Container Shipping Services</h2>
          <p className="text-lg mb-4">We offer reliable and efficient container shipping services to transport goods across countries and continents. Whether you're importing or exporting, our containerized delivery solutions ensure your products arrive safely and on time.</p>
          
          <div className="cursor-pointer  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">International Container Shipping</h3>
              <p>We provide shipping services across various international routes, connecting countries around the world.</p>
            </div>
            <div className= "cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Door-to-Door Delivery</h3>
              <p>Our team picks up your goods from your location and ensures it is delivered to your destination on time.</p>
            </div>
            <div className=" cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Customs Clearance</h3>
              <p>We handle all customs paperwork and ensure your shipments are cleared quickly for smooth delivery.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  