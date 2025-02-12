"use client";

import Link from "next/link";

export default function AboutProject() {
  return (
    <main className="max-xl:px-5 pb-12 md:pb-28 ">
      <div className="flex flex-col gap-8 max-w-[800px] w-full mx-auto p-12 rounded-[40px] border border-[#0E464F] bg-[#041E23] ">
        <p className="text-base font-normal font-roboto leading-6 text-white">
          Event Ticket Booking UI - Open Source Practice Project 🎟️
          <br />
          <br />
          Overview
          <br />
          <br />
          This is a beginner-friendly yet practical Event Ticket Booking UI
          designed for developers to clone, explore, and build upon. The design
          focuses on a seamless, login-free ticket reservation flow, allowing
          users to book event tickets quickly and efficiently.
          <br />
          <br />
          The project consists of a three-step ticket booking flow, and
          developers can extend it further by integrating payment solutions,
          user authentication (optional), and ticket validation systems.
          <br />
          <br />
          Flow & Features
          <br />
          <br />
          1️⃣ Ticket Selection • Users can browse available tickets (Free &
          Paid). • Ticket options are displayed in a list or card view. • For
          Free Tickets → Clicking “Get Free Ticket” proceeds to attendee
          details. • For Paid Tickets → Clicking “Purchase Ticket” would ideally
          open a payment modal.
          <br />
          <br />
          2️⃣ Attendee Details Form • Users input their Name, Email, and optional
          Phone Number. • Profile picture upload option with preview
          functionality. • Ticket summary is visible to ensure users review
          their details before submission.
          <br />
          <br />
          3️⃣ Payment or Success Page • If the ticket is free, the user is taken
          directly to the Ticket Confirmation Page. • If the ticket is paid,
          developers can integrate Stripe, Paystack, or Flutterwave to process
          payments before showing the confirmation page. • Upon successful
          booking, users should receive: • A visual ticket preview with a unique
          QR Code. • An option to download the ticket as PDF or save it to their
          device. • An email confirmation containing ticket details. How to
          Build This 🚀
          <br />
          <br />
          This UI can be implemented using:
          <br />
          <br />
          📌 Frontend (Next.js or React) • Component Breakdown: • TicketCard.tsx
          → Displays ticket details • AttendeeForm.tsx → Captures user details •
          PaymentModal.tsx → Handles payment processing • SuccessScreen.tsx →
          Shows the final ticket preview • State Management: React&apos;s
          Context API, Zustand, or Redux (if needed). • File Handling: Users
          should be able to upload images (profile picture for ticket) using
          Firebase Storage, Cloudinary, or local preview with
          URL.createObjectURL().
          <br />
          <br />
          📌 Backend (Optional) • If persistence is required, a backend can be
          built using: • Node.js & Express or Firebase Functions • Database:
          MongoDB, PostgreSQL, or Firebase Firestore to store ticket records
          <br />
          <br />
          📌 Payment Integration • For paid events, developers should integrate:
          • Stripe Checkout (for international transactions) • Paystack or
          Flutterwave (for African users) What You&apos;ll Learn 🧑‍💻 • File
          handling & validation (profile picture uploads). • Dynamic UI updates
          based on ticket selection. • Persisting bookings using local state or
          a backend. • Integrating payment gateways for ticket purchases. •
          Generating & validating QR Codes for event check-in (Advanced). Need
          Help? Reach Out! 💬
        </p>

        <h1 className="text-[80px] font-normal leading-[120px] text-white text-center">
          💛 Enjoy
        </h1>
        <div className="max-w-[558px] w-full mx-auto bg-[#041E23] border border-[#0E464F] flex gap-8 md:px-12 justify-between rounded-3xl py-4 px-12">
          <Link
            href="https://www.figma.com/community/file/1470800949188681164/event-ticket-booking-ui-open-source-practice-project"
            className="py-3 px-6 rounded-lg font-normal text-base text-[#24A0B5] leading-6 border border-[#24A0B5] bg-[#041E23] w-full text-center jeju"
          >
            Design File
          </Link>
          <Link
            href="https://github.com/Marvellous-Udoye/hngx-stage2-conference-ticket-generator"
            className="py-3 px-6 rounded-lg font-normal text-base text-white leading-6 border border-[#24A0B5] bg-[#24A0B5] w-full text-center jeju"
          >
            Github code{" "}
          </Link>
        </div>
      </div>
    </main>
  );
}
