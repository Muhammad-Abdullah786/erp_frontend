"use client";

import dynamic from "next/dynamic";
// import Admin_Tracking from "@/components/AdminTracking/Admin_Tracking";
// Dynamically import the AdminTracking component with SSR disabled
const Admin_Tracking = dynamic(
  () => import("@/components/AdminTracking/Admin_Tracking"),
  {
    ssr: false, // Disable SSR for the AdminTracking component
  }
);

const Page = () => {
  return <Admin_Tracking />;
};

export default Page;