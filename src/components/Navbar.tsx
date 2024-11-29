// app/components/Navbar.tsx
import Link from "next/link";
export default function Navbar() {
    return (
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">LogisticsCo</h1>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
          <div className="flex space-x-4">
            <Link href="/register" className="bg-white hover:opacity-85 transition-all text-black  py-2 px-4 rounded-md">Sign Up</Link>
            <Link href="/login" className="bg-white hover:opacity-85 transition-all text-black  py-2 px-4 rounded-md">Log In</Link>
          </div>
        </div>
      </nav>
    );
  }
  