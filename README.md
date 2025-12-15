# 🌿 Shulov Park

> **Freshness Delivered Daily.**
> User-friendly grocery delivery platform connecting customers with high-quality organic produce.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## � Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Deployment](#-deployment)

## 📖 Overview
**Shulov Park** is a modern, responsive web application designed to simulate a complete e-commerce experience for grocery shopping. Built with a focus on performance and user experience, it utilizes modern vanilla JavaScript (ES6 Modules) and a custom CSS design system to ensure a fast, lightweight, and consistent interface across all devices.

## ✨ Key Features

### 🛍️ Shopping Experience
*   **Dynamic Product Catalog**: Real-time filtering by category and search queries.
*   **Smart Cart System**: Persistent shopping cart using `localStorage` (or Cloud sync).
*   **Interactive UI**: Smooth animations, toast notifications for actions, and responsive grid layouts.
*   **Daily Prices**: Marquee display of fluctuating market prices.

### 🔐 User Management
*   **Authentication**: Login/Signup functionality powered by **Firebase Auth**.
*   **Profile Management**: User dashboard to view order history and manage saved addresses.
*   **Admin Dashboard**: Dedicated interface for inventory management (Products, Categories, Orders).

### 🎨 Design & Accessibility
*   **Responsive**: Mobile-first architecture ensuring perfect rendering on Phones, Tablets, and Desktops.
*   **Design System**: Centralized CSS variables for consistent theming (Colors, Spacing, Typography).
*   **Semantic HTML**: Built with accessibility and SEO best practices in mind.

## 🛠 Technology Stack
*   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
*   **Backend / BaaS**: Google Firebase (Authentication, Firestore)
*   **Icons**: FontAwesome 6
*   **Fonts**: 'Outfit' via Google Fonts

## 📂 Project Structure
```bash
shulov-park/
├── src/
│   ├── config/          # Configuration files (Firebase, Env)
│   ├── services/        # Business logic (Auth, Data, Cart)
│   └── utils/           # Helper functions
├── styles/
│   └── main.css         # Main stylesheet (Design System)
├── images/              # Static assets
├── index.html           # Main entry point
├── account.html         # User dashboard
└── admin.html           # Administrative panel
```

## 🚀 Getting Started

### Prerequisites
*   A modern web browser (Chrome, Edge, Firefox).
*   A local development server (Required for ES6 Modules).

### Local Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/shulov-park.git
    cd shulov-park
    ```

2.  **Configure Environment**
    *   Ensure `src/config/firebase-config.js` contains your valid Firebase keys.

3.  **Run Locally**
    Since this project uses ES6 Modules, opening `index.html` directly will result in CORS errors.
    
    *Using Python:*
    ```bash
    python -m http.server 8000
    # Open http://localhost:8000
    ```
    
    *Using Node.js:*
    ```bash
    npx http-server .
    # Open http://127.0.0.1:8080
    ```

    *Using VS Code:*
    *   Install **Live Server** extension.
    *   Right click `index.html` > **Open with Live Server**.

## ⚙️ Configuration
The application relies on **Firebase** for backend services.
1.  Create a project at [Firebase Console](https://console.firebase.google.com/).
2.  Navigate to Project Settings > General > Your Apps > Web App.
3.  Copy the `firebaseConfig` object.
4.  Paste it into `src/config/firebase-config.js`.

## ☁️ Deployment

### Firebase Hosting (Recommended)
1.  **Install Firebase CLI**: `npm install -g firebase-tools`
2.  **Login**: `firebase login`
3.  **Initialize**: `firebase init hosting` (Select "public" directory as current directory `.`)
4.  **Deploy**:
    ```bash
    firebase deploy
    ```

### GitHub Pages
1.  Go to repository **Settings** > **Pages**.
2.  Select **Source** as `main branch` / `root`.
3.  Save.

---
© 2024 Shulov Park. All Rights Reserved.
