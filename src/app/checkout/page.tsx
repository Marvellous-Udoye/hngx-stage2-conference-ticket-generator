"use client";

import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();

  return (
    <main className="max-xl:px-5 pb-12 md:pb-28 ">
      <div className="max-w-[700px] w-full mx-auto p-12 rounded-[40px] border border-[#0E464F] bg-[#041E23] ">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex max-md:flex-col justify-between gap-3">
            <h1 className="text-[32px] font-normal text-white jeju">Ready </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 3/3
            </p>
          </div>

          <div className="h-1 w-full rounded-[5px] bg-[#0E464F]">
            <div className="w-[39%] h-1 rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        <div className="py-8 flex flex-col gap-4 text-center">
          <h1 className="text-white font-normal text-[32px] font-alatsi">
            Your Ticket is Booked!
          </h1>
          <p className="text-base font-normal leading-6 text-foreground font-roboto">
            You can download or Check your email for a copy
          </p>
        </div>

        <div className="py-8 px-[21px] flex items-center justify-center"></div>

        <div className="flex gap-6">
          <button
            onClick={() => router.push("/")}
            className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
            data-testid="back-button"
          >
            Book Another Ticket
          </button>
          <button
            className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
            data-testid="submit-button"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </main>
  );
}
