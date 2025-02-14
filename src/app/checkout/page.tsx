"use client";

import { ticketTypesData } from "@/components/Tickets/Tickets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TicketBg from "../../../public/images/TICKET.png";
import Barcode from "../../../public/images/barcode.jpg";
import { useFormContext } from "../../components/Context/FormContext";
import { useTicketContext } from "../../components/Context/TicketContext";

export default function Checkout() {
  const router = useRouter();
  const { formData } = useFormContext();
  const { ticketData } = useTicketContext();
  const [storedFormData, setStoredFormData] = useState(formData);
  const [storedTicketData, setStoredTicketData] = useState(ticketData);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedTicketData = localStorage.getItem("ticketData");

    if (savedFormData) {
      setStoredFormData(JSON.parse(savedFormData));
    }
    if (savedTicketData) {
      setStoredTicketData(JSON.parse(savedTicketData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
  }, [formData, ticketData]);

  const isDataComplete =
    storedFormData.name &&
    storedFormData.email &&
    storedFormData.request &&
    storedFormData.avatar &&
    storedTicketData.selectedTypeIndex !== undefined &&
    storedTicketData.selectedTicketNumber !== undefined;

  return (
    <main className="max-xl:px-5 pb-12 md:pb-28" role="main">
      <div className="max-w-[700px] w-full mx-auto p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-[#0E464F] bg-[#041E23]">
        <div className="flex flex-col gap-3 md:mb-8">
          <div className="flex items-center justify-between gap-3">
            <h1
              className="text-2xl md:text-[32px] font-normal leading-normal text-white jeju"
              aria-label="Checkout Step 3 of 3"
            >
              Ready
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 3/3
            </p>
          </div>

          <div className="h-1 w-full rounded-[5px] bg-[#0E464F]">
            <div className="w-full h-1 rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        {isDataComplete ? (
          <div className="pt-8 flex flex-col gap-3 md:gap-4">
            <h1
              className="text-white text-bold md:font-normal text-[24px] md:text-[32px] max-md:leading-[33.6px] font-roboto md:font-alatsi text-center"
              aria-label="Ticket Booking Confirmation"
            >
              Your Ticket is Booked!
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto text-center">
              <span className="max-md:hidden">
                Check your email for a copy or you can <strong>download</strong>
              </span>
              <span className="md:hidden">
                You can download or Check your email for a copy
              </span>
            </p>

            <div className="py-8 md:px-[21px] flex items-center justify-center">
              <div className="relative" aria-labelledby="ticket-image">
                <Image
                  width={300}
                  height={600}
                  src={TicketBg}
                  alt="Ticket Image"
                  className="w-[300px] h-[600px]"
                  priority
                />

                <div className="absolute sm:max-w-[260px] w-full max-h-[446px] flex flex-col gap-5 p-[14px] rounded-[16px] border border-[#24A0B5] bg-[rgba(3,30,33,0.10)] backdrop-blur-[2px] m-auto top-5 max-sm:max-w-[95%] left-2 sm:left-5 transform max-sm:scale-x-[95%]">
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
                      src={storedFormData.avatar || "/api/placeholder/140/140"}
                      width={140}
                      height={140}
                      alt="Ticket avatar"
                      style={{ objectFit: "cover" }}
                      className="w-[140px] h-[140px] rounded-xl border-4 border-[#24A0B5]/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 p-1 rounded-lg border border-[#133D44] bg-[#08343C] max-h-[160px]">
                    <div className="flex flex-col gap-1 p-1 border-r border-b border-[#12464E] h-[45px]overflow-hidden">
                      <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                        Enter your name
                      </p>
                      <p className="text-xs font-bold leading-[18px] font-roboto text-white">
                        {storedFormData.name}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 pl-3 pr-1 py-1 border-b border-[#12464E] h-[45px] overflow-hidden">
                      <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                        Enter your email *
                      </p>
                      <p className="text-xs font-bold leading-[18px] font-roboto text-white">
                        {storedFormData.email}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 p-1 border-r border-b border-[#12464E] h-[45px] overflow-hidden">
                      <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                        Ticket Type:
                      </p>
                      <p className="text-xs font-normal leading-[18px] font-roboto text-white">
                        {
                          ticketTypesData[storedTicketData.selectedTypeIndex]
                            .type
                        }
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 pl-3 pr-1 py-1 border-b border-[#12464E] h-[45px] overflow-hidden">
                      <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                        Ticket for :
                      </p>
                      <p className="text-xs font-normal leading-[18px] font-roboto text-white">
                        {storedTicketData.selectedTicketNumber}
                      </p>
                    </div>

                    <div className="col-span-2 p-2 flex flex-col gap-1 max-w-[208px] h-[65px] w-full overflow-hidden">
                      <p className="text-[10px] font-normal leading-[15px] font-roboto text-white opacity-[33%]">
                        Special request?
                      </p>
                      <p className="text-[10px] font-normal leading-[15px] font-roboto text-white line-clamp-2">
                        {storedFormData.request}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute transform max-sm:max-w-[60%] bottom-5 left-[52px] sm:left-8">
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
          </div>
        ) : (
          <div className="py-8 flex flex-col gap-4 text-center">
            <h1
              className="text-white font-normal text-[32px] font-alatsi"
              aria-label="Incomplete Data"
            >
              Fill the form to get your ticket
            </h1>
            <button
              onClick={() => router.push("/details")}
              className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
              aria-label="Go to Form"
            >
              Go to Form
            </button>
          </div>
        )}

        <div className="flex max-md:flex-col-reverse gap-4 md:gap-6 mt-6">
          <button
            onClick={() => router.push("/")}
            className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
            aria-label="Book Another Ticket"
          >
            Book Another Ticket
          </button>
          <button
            className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
            aria-label="Download Ticket"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </main>
  );
}
