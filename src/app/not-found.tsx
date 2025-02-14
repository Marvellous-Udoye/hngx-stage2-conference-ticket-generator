"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-b from-[#041E23] to-[#08252B]">
      <h1 className="text-3xl md:text-6xl font-bold text-white mb-8">
        404 - Page Not Found
      </h1>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-lg font-medium text-base text-white bg-[#24A0B5] hover:bg-[#197686] transition-colors duration-300"
      >
        Go back
      </button>
    </div>
  );
}
