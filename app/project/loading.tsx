import React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
