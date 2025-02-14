"use client";

import { ticketTypesData } from "@/components/Tickets/Tickets";
import TicketType from "@/components/Tickets/TicketType";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTicketContext } from "../components/Context/TicketContext";

export default function Home() {
  const { ticketData, setTicketData } = useTicketContext();
  const router = useRouter();

  useEffect(() => {
    const storedType = localStorage.getItem("selectedTicketType");
    const storedNumber = localStorage.getItem("selectedTicketNumber");

    if (storedType) {
      const index = ticketTypesData.findIndex(
        (ticket) => ticket.type === storedType
      );
      if (index !== -1) {
        setTicketData((prev) => ({ ...prev, selectedTypeIndex: index }));
      }
    }

    if (storedNumber) {
      setTicketData((prev) => ({
        ...prev,
        selectedTicketNumber: parseInt(storedNumber, 10),
      }));
    }
  }, [setTicketData]);

  const handleTicketTypeClick = (index: number) => {
    setTicketData((prev) => ({ ...prev, selectedTypeIndex: index }));
    localStorage.setItem("selectedTicketType", ticketTypesData[index].type);
  };

  const handleTicketNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const number = parseInt(event.target.value, 10);
    setTicketData((prev) => ({ ...prev, selectedTicketNumber: number }));
    localStorage.setItem("selectedTicketNumber", number.toString());
  };

  return (
    <main className="max-xl:px-5 pb-12 md:pb-28 ">
      <div className="max-w-[700px] w-full mx-auto p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] ">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex max-md:flex-col justify-between gap-3">
            <h1
              className="text-2xl md:text-[32px] font-normal leading-normal text-white jeju"
              aria-label="Checkout Step 1 of 3"
            >
              Ticket Selection
            </h1>
            <p className="text-base font-normal leading-6 text-foreground font-roboto">
              Step 1/3
            </p>
          </div>

          <div className="h-1 w-full rounded-[5px] bg-[#0E464F]">
            <div className="w-1/2 h-1 rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 md:p-6 rounded-[32px] bg-[#08252B] md:border border-[#0E464F]">
          <div className="flex flex-col items-center p-6 gap-2 max-md:py-4 max-md:px-6 rounded-2xl border-r-2 border-b-2 border-l-2 border-[#07373F] radial-gradient backdrop-blur-[7px]">
            <h1 className="text-5xl text-[62px] font-normal leading-[48px] md:leading-[62px] font-roadRage text-foreground text-center">
              Techember Fest ”25
            </h1>
            <p className="max-w-[340px] w-full text=[14px] md:text-base font-roboto font-normal leading-[21px] md:leading-6 text-center text-foreground">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
            <div className="flex max-md:flex-col items-center gap-1 md:gap-4 font-roboto text-base font-normal leading-6 text-foreground max-md:mt-8">
              <span>📍 [Event Location]</span>
              <span className="max-md:hidden">| |</span>
              <span>March 15, 2025 | 7:00 PM</span>
            </div>
          </div>

          <div className="h-1 bg-[#07373F] w-full"></div>

          <div>
            <h3 className="gap-4 font-roboto text-base font-normal leading-6 mb-2">
              Select Ticket Type:
            </h3>
            <div className="flex max-md:flex-col gap-5 p-4 rounded-2xl border border-[#07373F] bg-[#052228]">
              {ticketTypesData.map((ticketType, index) => (
                <TicketType
                  key={index}
                  type={ticketType.type}
                  numberLeft={ticketType.numberLeft}
                  price={ticketType.price}
                  isSelected={index === ticketData.selectedTypeIndex}
                  onClick={() => handleTicketTypeClick(index)}
                />
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
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M16.293 8.29309L12 12.5861L7.70697 8.29309L6.29297 9.70709L12 15.4141L17.707 9.70709L16.293 8.29309Z' fill='white'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "20px",
              }}
              value={ticketData.selectedTicketNumber}
              onChange={handleTicketNumberChange}
              aria-label="Select number of tickets"
            >
              {[...Array(9)].map((_, i) => (
                <option
                  key={i}
                  value={i + 1}
                  className="bg-[#0E464F] hover:bg-[#24A0B5] py-3"
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex max-md:flex-col-reverse gap-4 md:gap-6">
            <button
              onClick={() => router.refresh()}
              className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full jeju"
            >
              Cancel
            </button>
            <button
              onClick={() => router.push("/details")}
              className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full jeju"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
