"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface TicketData {
  selectedTypeIndex: number;
  selectedTicketNumber: number;
}

interface TicketContextProps {
  ticketData: TicketData;
  setTicketData: React.Dispatch<React.SetStateAction<TicketData>>;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [ticketData, setTicketData] = useState<TicketData>({
    selectedTypeIndex: 0,
    selectedTicketNumber: 1,
  });

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
};
