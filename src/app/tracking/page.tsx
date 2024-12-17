'use client'

import dynamic from "next/dynamic";
// import TrackingContainer from "@/components/Tracking_container/Tracking_container";
// import Tracking_container to mark it as a client-side component
const TrackingContainer = dynamic(
  () => import("@/components/Tracking_container/Tracking_container"),
  { ssr: false }
);

const page = () => {
  return (
    <div>
      <TrackingContainer />
    </div>
  );
};

export default page;