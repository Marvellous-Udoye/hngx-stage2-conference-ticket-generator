# Conference Ticket Generator 🎟️

## 📌 Overview
This project is a **Conference Ticket Generator** built with React. It allows users to fill out a form with their details, validates their input, and generates a personalized conference ticket upon successful submission.

## 🚀 Features

### 📝 Form Elements
- **Full Name**: Text input for user's name.
- **Email Address**: Email input field with validation.
- **Avatar Upload**: Users can upload their avatar using a Cloudinary URL or any image link.
- **Submit Button**: Validates input and generates the ticket.

### ✅ Form Validation
- All required fields must be filled before submission.
- The email must be in a valid format.
- The avatar must be a valid external image URL.
- Clear error messages are displayed if validation fails.

### 💾 State Persistence
- User inputs persist using **IndexedDB or local storage** to prevent data loss on page refresh.

### 🎟️ Ticket Generation
- After successful form submission, a ticket is generated with:
  - Full Name
  - Email Address
  - Avatar Image (from the provided URL)
- The ticket appears only when all validations pass.

### ♿ Accessibility
- Screen-reader friendly form elements, hints, and error messages.
- Keyboard navigable with proper focus states.
- Users can complete and submit the form entirely using the keyboard.

### 📱 Responsive Design
- The form and ticket layout seamlessly adjust across different screen sizes.
- Optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack
- **React** (or Next.js)
- **CSS/Tailwind CSS** for styling
- **IndexedDB/Local Storage** for data persistence
- **Cloudinary** for avatar uploads
- **React Testing Library** for testing
