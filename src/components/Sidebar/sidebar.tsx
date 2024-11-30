"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Ship, Globe, Package, Phone } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "" },
  { icon: Ship, label: "Services", href: "#services" },
  { icon: Globe, label: "Why Us", href: "#why-us" },
  //   { icon: Package, label: "Login", href: "#gallery" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Toggle Menu</span>
        {isOpen ? (
          <Package className="h-5 w-5" />
        ) : (
          <Home className="h-5 w-5" />
        )}
      </Button>

      {/* Overlay (optional) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <ScrollArea className="h-full py-6 px-6">
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
