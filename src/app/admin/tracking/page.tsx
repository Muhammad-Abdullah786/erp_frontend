"use client";

import dynamic from "next/dynamic";

// Dynamically import the AdminTracking component with SSR disabled
const AdminTrackingWithNoSSR = dynamic(
  () => import("@/components/AdminTracking/Admin_Tracking"),
  {
    ssr: false, // Disable SSR for the AdminTracking component
  }
);

const Page = () => {
  return <AdminTrackingWithNoSSR />;
};

export default Page;