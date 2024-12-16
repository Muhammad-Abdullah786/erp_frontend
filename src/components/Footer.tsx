// app/components/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 LogisticsCo. All rights reserved.</p>
          <ul className="flex justify-center space-x-6 mt-4">
            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    );
  }
  