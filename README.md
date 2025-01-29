# 🎉 Eventopia
Eventopia is a **Next.js-based event management platform** that enables users to create, discover, and manage events seamlessly. With features like **secure authentication**, **event bookings**, and **interactive filters**, Eventopia provides a smooth and engaging experience for event organizers and attendees.

## 🚀 Features
- 🔐 **User Authentication**: Secure sign-in and sign-up using Clerk authentication.
- 📅 **Event Management**: Create, update, and manage events effortlessly.
- 🛒 **Bookings & Orders**: Streamlined ticket booking and order management system.
- 🔍 **Search & Filters**: Advanced event search with category-based filtering.
- 📦 **File Uploading**: Seamless image and file uploads using UploadThing.
- 🎭 **Smooth UI & UX**: Responsive and intuitive interface with animated transitions.

## 🛠 Tech Stack
- 🎨 **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- 🖥 **Backend**: Node.js, MongoDB, Mongoose
- 🔑 **Authentication**: Clerk
- ☁ **File Uploading**: UploadThing
- 📡 **Hosting**: Vercel

## 📂 Directory Structure
```
akankshrakesh-eventopia/
├── app/
│   ├── (auth)/           # Authentication pages (sign-in, sign-up)
│   ├── (root)/           # Main application pages (events, orders, profile)
│   ├── api/              # API routes (uploading, webhooks)
├── components/
│   ├── shared/           # Reusable UI components (cards, filters, forms, etc.)
│   ├── ui/               # UI elements (buttons, inputs, checkboxes, etc.)
├── lib/
│   ├── uploadthing.ts    # Upload handling
│   ├── utils.ts          # Helper functions
│   ├── database/         # Database connection & models
├── constants/            # App-wide constants
├── public/               # Static assets
├── types/                # TypeScript types
├── middleware.ts         # Middleware for handling requests
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies & scripts
```
## 🔗 Link
https://eventopia-olive.vercel.app/

## 🖼️ Photos
![image](https://github.com/user-attachments/assets/171649d8-4db8-4e3b-8fd9-16ca08b057f7)
![image](https://github.com/user-attachments/assets/f7e40e39-214a-449f-b9c2-83988ccf5c31)
![image](https://github.com/user-attachments/assets/caabf179-ae4c-4272-94b5-82c4575e2d81)
