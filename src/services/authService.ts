// /src/services/authService.ts
import axios from "axios";
import { url } from "@/apiURL";
export const registerClient = async (clientData: any) => {
  try {
    const response = await axios.post(`${url}/client/register`, clientData);
    return response.data;
  } catch (error: any) {
    console.error("Error during registration:", error.response.data || error);
    // throw error; // Rethrow the error so the mutation can catch it
  }
};
// services/authService.ts
export async function loginClient(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${url}/client/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data; // Assuming 'data' contains the token and other user details
}

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
