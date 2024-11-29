import React, { Suspense } from "react";
import UpdatePassword from "./UpdatePass";

export default function AddProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePassword />
    </Suspense>
  );
}
