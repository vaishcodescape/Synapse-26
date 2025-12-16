# 🎉 Synapse Fest - College Festival Management System

A complete, modern, and feature-rich admin dashboard for managing college festivals, events, registrations, merchandise, accommodation, and more. Built with React, Vite, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Modules Overview](#modules-overview)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🎪 Event Management
- **Event Categories** - Create and manage event categories (Technical, Cultural, Sports, etc.)
- **Event Creation** - Add events with details like name, date, category, rulebook, images
- **Participation Types** - Solo, Duet, Group with customizable team sizes and fees
- **Registration Control** - Toggle registration open/close for each event
- **Custom Group Sizes** - Set min/max participants per event (e.g., 3-8, 4-10, etc.)
- **Edit & Delete** - Full CRUD operations with modal-based editing

### 📝 Registration Management
- **View All Registrations** - Comprehensive list of all event registrations
- **Advanced Filters** - Filter by event, payment method, payment status
- **Search Functionality** - Search by name, email, college, or transaction ID
- **Payment Tracking** - Track UPI, Credit Card, Debit Card, Net Banking payments
- **Gateway Charges** - Configure and calculate payment gateway fees (2% UPI, 3% Credit Card, etc.)
- **Revenue Analytics** - View Gross Revenue, Gateway Charges, and Net Revenue
- **Export Data** - Download filtered registrations as CSV with financial breakdown

### 👥 User Management
- **User Directory** - View all registered users with contact details
- **Event Filter** - See users registered for specific events
- **Search Users** - Quick search by name, email, or college
- **User Details** - View complete user profile and registered events
- **CSV Export** - Download user data for analysis

### 🤝 Sponsor Management
- **Sponsor Tiers** - Platinum, Gold, Silver, Bronze, or custom tiers
- **Logo Upload** - Upload sponsor logos for display
- **Website Links** - Add sponsor website URLs
- **Edit & Delete** - Manage sponsor information easily
- **Custom Tiers** - Create unlimited custom sponsor categories

### 🏨 Accommodation Management
- **Package Creation** - Create accommodation packages with date ranges
- **Pricing** - Set total package price (not per night)
- **Date Range** - Define start and end dates for packages
- **Duration Display** - Auto-calculate package duration in days
- **Availability Toggle** - Mark packages as Available/Full
- **Description** - Add package details, amenities, meals info

### 👕 Merchandise Management
- **Product Management** - Add t-shirts, hoodies, caps, and other merchandise
- **Size Options** - Multiple sizes (XS to XXXL + Free Size)
- **Stock Control** - Toggle In Stock/Out of Stock status
- **Image Upload** - Upload product images
- **Price Management** - Set and update product pricing
- **Orders Tracking** - View all merchandise orders with customer details
- **Order Filters** - Filter by product, search customers
- **CSV Export** - Download order data

### 🎵 Concert Nights & Artists
- **Concert Management** - Create and manage concert nights
- **Artist Profiles** - Add artists with photos and details
- **Schedule** - Set concert date, time, and venue
- **Edit & Delete** - Full control over concert and artist data

### 📊 Dashboard & Analytics
- **Statistics Overview** - Key metrics at a glance
- **Revenue Tracking** - Gross and net revenue with gateway charges
- **Registration Stats** - Total, paid, and pending registrations
- **Visual Cards** - Color-coded statistics cards
- **Real-time Updates** - Instant data refresh

### 🎨 UI/UX Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern Interface** - Clean, intuitive Tailwind CSS design
- **Modal Windows** - Elegant popups for editing and viewing details
- **Toggle Switches** - Easy on/off controls for availability
- **Color-coded Status** - Green for active/paid, Red for inactive/pending, etc.
- **Search & Filter** - Powerful filtering on every page
- **Active Filter Display** - See all applied filters with clear-all option

---

## 🖼️ Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Event Management
![Events](./screenshots/events.png)

### Registration Analytics
![Registrations](./screenshots/registrations.png)

### Merchandise Orders
![Merchandise](./screenshots/merchandise.png)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework

### Features & Libraries
- **React Hooks** - useState, useEffect for state management
- **CSV Export** - Client-side CSV generation and download
- **File Upload** - Image upload support
- **Form Validation** - Built-in HTML5 validation
- **Modal Components** - Custom modal implementations
- **Responsive Grid** - CSS Grid and Flexbox layouts

---

## 🚀 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Git

### Steps

1. **Clone the repository**
