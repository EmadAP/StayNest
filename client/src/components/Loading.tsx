import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <div className="border-2  border-green-500 rounded-xl">
        <Image src="/loading.png" alt="loading" width={500} height={500} />
        <svg
          className="mt-4 mb-4 px-4"
          width="100%"
          height="30"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="20"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            rx="4"
            ry="4"
          />
          <rect x="0" y="0" width="0" height="20" fill="#22c55e" rx="4" ry="4">
            <animate
              attributeName="width"
              values="0;100;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
    </div>
  );
}

export default Loading;
