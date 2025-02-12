"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import TicketBg from "../../../public/images/TICKET.png";
import Barcode from "../../../public/images/barcode.jpg";

export default function Checkout() {
  const router = useRouter();

  return (
    <main className="max-xl:px-5 pb-12 md:pb-28" role="main">
      <div className="max-w-[700px] w-full mx-auto p-12 rounded-[40px] border border-[#0E464F] bg-[#041E23]">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex max-md:flex-col justify-between gap-3">
            <h1
              className="text-[32px] font-normal text-white jeju"
              aria-label="Checkout Step 3 of 3"
            >
              Ready
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 3/3
            </p>
          </div>

          <div className="h-1 w-full rounded-[5px] bg-[#0E464F]">
            <div className="w-[39%] h-1 rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        <div className="py-8 flex flex-col gap-4 text-center">
          <h1
            className="text-white font-normal text-[32px] font-alatsi"
            aria-label="Ticket Booking Confirmation"
          >
            Your Ticket is Booked!
          </h1>
          <p className="text-base font-normal leading-6 text-foreground font-roboto">
            Check your email for a copy or you can <strong>download</strong>
          </p>
        </div>

        <div className="py-8 px-[21px] flex items-center justify-center">
          <div className="relative" aria-labelledby="ticket-image">
            <Image
              width={300}
              height={600}
              src={TicketBg}
              alt="Ticket Image"
              className="relative w-[300px] h-[600px]"
              priority
            />

            <div className="absolute max-w-[260px] max-h-[446px] flex flex-col gap-5 p-[14px] rounded-[16px] border border-[#24A0B5] bg-[rgba(3,30,33,0.10)] backdrop-blur-[2px] m-auto top-5 left-5">
              <div className="flex flex-col text-center">
                <h1
                  className="text-[34px] font-normal leading-[34px] font-roadRage text-white"
                  id="ticket-image"
                >
                  Techember Fest ”25
                </h1>
                <div className="p-1 flex flex-col gap-1 max-w-[175px] w-full mx-auto text-[10px] font-roboto font-normal leading-[15px] text-white">
                  <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p>📅 March 15, 2025 | 7:00 PM</p>
                </div>
              </div>

              <div className="flex self-center">
                <Image
                  src={""}
                  width={140}
                  height={140}
                  alt="Profile Preview"
                  style={{ objectFit: "cover" }}
                  className="w-[140px] h-[140px] rounded-xl border-4 border-[#24A0B5]/50"
                />
              </div>

              <div className="grid grid-cols-2 p-1 rounded-lg border border-[#133D44] bg-[#08343C]">
                <div className="flex flex-col gap-1 p-1 border-r border-b border-[#12464E]">
                  <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                    Enter your name
                  </p>
                  <p className="text-xs font-bold leading-[18px] font-roboto text-white">
                    Avi Chukwu
                  </p>
                </div>

                <div className="flex flex-col gap-1 pl-3 pr-1 py-1 border-b border-[#12464E]">
                  <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                    Enter your email *
                  </p>
                  <p className="text-xs font-bold leading-[18px] font-roboto text-white">
                    User@email.com
                  </p>
                </div>

                <div className="flex flex-col gap-1 p-1 border-r border-b border-[#12464E]">
                  <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                    Ticket Type:
                  </p>
                  <p className="text-xs font-normal leading-[18px] font-roboto text-white">
                    VIP
                  </p>
                </div>

                <div className="flex flex-col gap-1 pl-3 pr-1 py-1 border-b border-[#12464E]">
                  <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                    Ticket for :
                  </p>
                  <p className="text-xs font-normal leading-[18px] font-roboto text-white">
                    1
                  </p>
                </div>

                <div className="col-span-2 p-2 flex flex-col gap-1">
                  <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                    Special request?
                  </p>
                  <p className="text-[10px] font-normal leading-[15px] font-roboto text-white">
                    Nil ? Or the users sad story they write in there gets this
                    whole space, Max of three rows
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-7">
              <Image
                width={241}
                height={74}
                src={Barcode}
                alt="Barcode"
                className="relative w-[241px] h-[74px]"
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          <button
            onClick={() => router.push("/")}
            className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
            data-testid="back-button"
            aria-label="Book Another Ticket"
          >
            Book Another Ticket
          </button>
          <button
            className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
            data-testid="submit-button"
            aria-label="Download Ticket"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </main>
  );
}
