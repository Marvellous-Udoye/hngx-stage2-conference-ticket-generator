import { FormProvider } from "@/components/Context/FormContext";
import { TicketProvider } from "@/components/Context/TicketContext";
import Navbar from "@/components/layouts/Navbar";
import type { Metadata } from "next";
import { Alatsi, Geist, Geist_Mono, Road_Rage, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300"],
  subsets: ["latin"],
});

const roadRage = Road_Rage({
  variable: "--font-road-rage",
  weight: ["400"],
  subsets: ["latin"],
});

const alatsi = Alatsi({
  variable: "--font-alatsi",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "Fill the form and get a ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/hugeicons_ticket-01.svg" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${roadRage.variable} ${alatsi.variable} antialiased`}
      >
        <TicketProvider>
          <FormProvider>
            <Navbar />
            {children}
          </FormProvider>
        </TicketProvider>
      </body>
    </html>
  );
}
