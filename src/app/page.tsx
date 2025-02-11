"use client";

import { ticketTypesData } from "@/components/Tickets/Tickets";
import TicketType from "@/components/Tickets/TicketType";
import { useState } from "react";

export default function Home() {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

  return (
    <main className="max-xl:px-5 pb-12 md:pb-24 ">
      <div className="max-w-[700px] w-full mx-auto p-12 rounded-[40px] border border-[#0E464F] bg-[#041E23] ">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex max-md:flex-col justify-between gap-3">
            <h1 className="text-[32px] font-normal text-white jeju">
              Ticket Selection
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 1/3
            </p>
          </div>

          <div className="h-1 w-full rounded-[5px] bg-[#24A0B5]"></div>
        </div>

        <div className="flex flex-col space-y-8 p-6 rounded-[32px] bg-[#08252B] border border-[#0E464F]">
          <div className="flex flex-col items-center gap-2 p-6 rounded-2xl border-r-2 border-b-2 border-l-2 border-[#07373F] radial-gradient backdrop-blur-[7px]">
            <h1 className="text-[62px] font-normal leading-[62px] font-roadRage text-foreground">
              Techember Fest ”25
            </h1>
            <p className="max-w-[340px] w-full text-base font-roboto font-normal leading-6 text-center text-foreground">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
            <div className="flex items-center gap-4 font-roboto text-base font-normal leading-6 text-foreground">
              <span>📍 [Event Location]</span>
              <span>| |</span>
              <span>March 15, 2025 | 7:00 PM</span>
            </div>
          </div>

          <div className="h-1 bg-[#07373F] w-full"></div>

          <div>
            <h3 className="gap-4 font-roboto text-base font-normal leading-6 mb-2">
              Select Ticket Type:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl border border-[#07373F] bg-[#052228]">
              {ticketTypesData.map((ticketType, index) => (
                <div key={index}>
                  <TicketType
                    type={ticketType.type}
                    numberLeft={ticketType.numberLeft}
                    price={ticketType.price}
                    isSelected={index === selectedTypeIndex}
                    onClick={() => setSelectedTypeIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="select"
              className="font-normal text-base font-roboto leading-6 text-foreground"
            >
              Number of Tickets
            </label>
            <select
              name="Ticket number"
              id="select"
              className="text-white font-roboto text-base font-normal leading-6 rounded-xl border border-[#07373F] flex items-center gap-2 p-3 w-full bg-transparent appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='none' d='M0 0h20v20H0z'/%3E%3Cpath fill='%23FFFFFF' d='M5.5 7l4.5 4.5L14.5 7'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px",
              }}
            >
              <option value="1" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                1
              </option>
              <option value="2" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                2
              </option>
              <option value="3" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                3
              </option>
              <option value="4" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                4
              </option>
              <option value="5" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                5
              </option>
              <option value="6" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                6
              </option>
              <option value="7" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                7
              </option>
              <option value="8" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                8
              </option>
              <option value="9" className="bg-[#0E464F] hover:bg-[#24A0B5]">
                9
              </option>
            </select>
          </div>

          <div className="bg-[#041E23] border border-[#0E464F] flex gap-8 md:px-12 justify-between rounded-3xl">
            <button className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju">
              Cancel
            </button>
            <button className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
