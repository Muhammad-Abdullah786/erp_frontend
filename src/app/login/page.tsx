
// "use client";
// import { RxEyeClosed } from "react-icons/rx";
// import Link from "next/link";
// import { useState } from "react";
// import useSWRMutation from "swr/mutation";
// import { useRouter } from "next/navigation"; // For redirection
// import { login } from "@/services/authService"; // Use only one login function
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "react-toastify"; // Toast notification
// import { TfiEye } from "react-icons/tfi";
// import { url } from "@/apiURL";

// export default function LoginPage() {
//   const [formData, setFormData] = useState<any>({
//     name: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

//   const router = useRouter();

//   // Login mutation
//   const {
//     trigger: loginForm,
//     isMutating: isLoading,
//     error,
//   } = useSWRMutation(`${url}/login`, async (_, { arg }) => {
//     try {
//       const { name, password } = arg; // Destructure name and password from arg
//       const data = await login(name, password); // Pass them as arguments to the login function

//       // Store tokens
//       if (data.data.accessToken) {
//         localStorage.setItem("accessToken", data.accessToken);
//       }
//       if (data.data.refreshToken) {
//         localStorage.setItem("refreshToken", data.refreshToken);
//       }

//       // Check the greeting (role) and redirect accordingly
//       const { greeting } = data.data;
//       console.log("Data", data, "Greeting", greeting);
//       if (greeting === "admin") {
//         toast.success("Login successful! Redirecting to admin dashboard.");
//         router.push("/admin/dashboard");
//       } else if (
//         greeting === "hr" ||
//         greeting === "sales" ||
//         greeting === "accounts" ||
//         greeting === "driver"
//       ) {
//         toast.success("Login successful! Redirecting to employee dashboard.");
//         router.push(`/employee/${greeting.toLowerCase()}/dashboard`);
//       } else {
//         toast.success("Login successful! Redirecting to user dashboard.");
//         router.push("/user/dashboard");
//       }
//       return data;
//     } catch (err) {
//       toast.error("Login failed. Please try again.");
//       throw err; // This will trigger the error handling in SWRMutation
//     }
//   });

//   // Handle form change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submit with validation
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check if name and password are filled
//     if (!formData.name || !formData.password) {
//       toast.error("Please fill out all required fields.");
//       return;
//     }

//     // Proceed to login if all fields are filled
//     loginForm(formData);
//   };

//   return (
//     <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
//       <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
//         <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             name="name" // Change from 'username' to 'name'
//             type="text"
//             placeholder="Username"
//             value={formData.name} // This should stay the same
//             onChange={handleChange}
//             required
//           />

//           <div className="relative">
//             <Input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               {showPassword ? <TfiEye /> : <RxEyeClosed />}
//             </button>
//           </div>

//           <Button type="submit" disabled={isLoading} className="w-full">
//             {isLoading ? "Logging in..." : "Login"}
//           </Button>

//           <div className="text-end">
//             <Link
//               className="text-sm text-blue-600 underline hover:unset"
//               href="/forgotPassword"
//             >
//               Forgot Password
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { RxEyeClosed } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation"; // For redirection
import { login } from "@/services/authService"; // Use only one login function
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify"; // Toast notification
import { TfiEye } from "react-icons/tfi";
import { url } from "@/apiURL";

export default function LoginPage() {
  const [formData, setFormData] = useState<any>({
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const router = useRouter();

  // Login mutation
  const {
    trigger: loginForm,
    isMutating: isLoading,
    error,
  } = useSWRMutation(`${url}/login`, async (_, { arg }) => {
    try {
      const { name, password } = arg; // Destructure name and password from arg
      const data = await login(name, password); // Pass them as arguments to the login function
      // Store tokens
      if (data.data.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken); // accessToken directly from data
      }
      if (data.data.refreshToken) {
        localStorage.setItem("refreshToken", data.data.refreshToken); // refreshToken directly from data
      }

      // Check the greeting (role) and redirect accordingly
      if (data.data.greeting === "admin") {
        toast.success("Login successful! Redirecting to admin dashboard.");
        router.push("/admin/dashboard");
      } else if (
        data.data.greeting === "hr" ||
        data.data.greeting === "sales" ||
        data.data.greeting === "accounts" ||
        data.data.greeting === "driver"
      ) {
        toast.success("Login successful! Redirecting to employee dashboard.");
        router.push(`/employee/${data.data.greeting.toLowerCase()}/dashboard`);
      } else {
        toast.success("Login successful! Redirecting to user dashboard.");
        router.push("/user/dashboard");
      }
      return data;
    } catch (err) {
      toast.error("Login failed. Please try again.");
      throw err; // This will trigger the error handling in SWRMutation
    }
  });

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if name and password are filled
    if (!formData.name || !formData.password) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Proceed to login if all fields are filled
    loginForm(formData);
  };

  return (
    <div className="flex items-center bg-gray-300 justify-center min-h-screen px-5">
      <div className="max-w-lg w-full bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name" // Change from 'username' to 'name'
            type="text"
            placeholder="Username"
            value={formData.name} // This should stay the same
            onChange={handleChange}
            required
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <TfiEye /> : <RxEyeClosed />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-end">
            <Link
              className="text-sm text-blue-600 underline hover:unset"
              href="/forgotPassword"
            >
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
