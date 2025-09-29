import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";

export function LocationPermissionModal({ onRetry }) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "denied") {
          setIsBlocked(true);
        }
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-bold mb-2">Location Access Required</h2>
        <p className="text-gray-600 mb-4">We need your location to proceed.</p>

        {isBlocked ? (
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-2">
              Location access is blocked. Please enable it manually:
            </p>
            <ul className="list-disc text-left ml-4 space-y-1">
              <li>Click the <div className="w-6 h-6 inline-flex justify-center rounded-full shadow bg-gray-100 items-center"><Info size={15} className="inline text-dark"/></div> icon near your browser address bar</li>
              <li>Go to "Site Settings" → "Location" → "Allow"</li>
              <li>Then click Retry</li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4">
            Click below to allow location access.
          </p>
        )}

        <button
          onClick={onRetry}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
