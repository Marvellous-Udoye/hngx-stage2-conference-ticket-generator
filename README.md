# 🎟️ Conference Ticket Generator  

## 📌 Overview  
The **Conference Ticket Generator** is a web application that allows users to create a personalized conference ticket. Users fill out a form with their details, upload an avatar, and generate a unique ticket upon successful validation.  

🔗 **Live Demo**: [View Project](https://conference-ticket-generator-delta.vercel.app/)  
🎨 **Figma Design**: [View Design](https://www.figma.com/community/file/1470800949188681164/event-ticket-booking-ui-open-source-practice-project)  

## 🚀 Features  

### 📝 Form Elements  
- **Full Name**: Text input field for user's name.  
- **Email Address**: Email input with built-in validation.  
- **Avatar Upload**: Users can upload their avatar via an external image URL (Cloudinary or any valid link).  
- **Submit Button**: Ensures all input fields are valid before generating a ticket.  

### ✅ Form Validation  
- All required fields must be completed before submission.  
- The email must follow a valid format.  
- The avatar must be a valid external image URL.  
- User-friendly error messages guide users through correction.  

### 🎟️ Ticket Generation  
Once the form is successfully submitted, a personalized ticket is generated, displaying:  
- **Full Name**  
- **Email Address**  
- **Uploaded Avatar**  

The ticket appears only when all validations pass.  

### 💾 Data Persistence  
- User inputs are saved using **IndexedDB** or **local storage**, preventing data loss on page refresh.  

### ♿ Accessibility  
- Fully accessible with **screen-reader support**.  
- Proper focus management and keyboard navigation for a smooth user experience.  
- Semantic HTML ensures usability for all users.  

### 📱 Responsive Design  
- Adaptive layout for **mobile, tablet, and desktop**.  
- Optimized for various screen sizes.  

## 🛠️ Tech Stack  
This project was built using modern web technologies:  
- **Next.js** – For server-side rendering and routing.  
- **TypeScript** – Ensuring type safety and scalability.  
- **Tailwind CSS** – For a sleek and customizable UI.  
- **IndexedDB/Local Storage** – For storing user data persistently.  
- **Cloudinary** – For handling avatar uploads.  
