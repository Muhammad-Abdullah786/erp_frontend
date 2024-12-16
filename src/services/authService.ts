// /src/services/authService.ts
import axios from "axios";
import { url } from "@/apiURL";
export async function registerEmployee(
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: string,
  consent: boolean
) {
  const response = await fetch(`${url}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phoneNumber, password, role, consent }),
  });
  return response.json();
}

export const login = async (name: string, password: string) => {
  try {
    const response = await axios.post(`${url}/login`, { name, password });
    if (response.status !== 200) throw new Error("Login failed");
    return response.data; // Response me token aur user details ko handle karenge
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Error ko handle karne ke liye error ko wapas throw karenge
  }
};

export const resetPasswordRequest = async (email: string) => {
  const response = await axios.post(`${url}/client/reset-password`, { email });
  return response.data;
};

export const updatePasswordRequest = async (
  token: string,
  newPassword: string
) => {
  const response = await axios.post(`${url}/client/update-password`, {
    token,
    newPassword,
  });
  return response.data;
};

export const registerClient = async (clientData: {
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  cnicOrPassport?: string;
}) => {
  try {
    const response = await axios.post(`${url}/client/register`, clientData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};