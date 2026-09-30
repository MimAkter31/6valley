# 🛒 6valley - Modern Multi-Vendor eCommerce Web Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_4-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active%20&%20Clean-success?style=for-the-badge)

A fast, fully responsive, and interactive frontend for the **6valley Multi-Vendor eCommerce Platform**. Designed with modern UI/UX aesthetics, dynamic client-side authentication, custom SVG captcha verification, interactive customer dashboards, and a promotional modal system.

---

## 🌟 Key Features

### 🛍️ 1. Interactive Storefront & Home Experience (`index.html`)
- **Promotional Popup Modal**: Auto-triggered promotional banner modal with smooth corner-overlapping close button (`×`), translucent idle opacity (`0.65`), and full-opacity hover effect (`1.0`). Clicking the banner smoothly scrolls to current deals and product offers.
- **Top Navigation & Header**: Responsive dual-mode navbar with search bar, department menus, multi-currency / language selectors, interactive mini-cart, and order tracking modal.
- **Flash Deals & Featured Sections**: Highlighting top categories, featured brands, new arrivals, recommended products, and promotional banners with smooth carousel sliders.

### 🔐 2. Authentication & Session System (`sign-in.html` & `sign-up.html`)
- **Dual-State Navbar**:
  - **Guest Mode**: Displays `Sign in` / `Sign up` dropdown with direct links to auth pages.
  - **Logged-in Mode**: Displays personalized greeting (`Hello, Tomas`), user avatar, and a quick-access `Dashboard` dropdown with links to *My Profile*, *My Orders*, and *Sign Out*.
- **Quick Demo Mode**: 1-click **"⚡ Quick Demo Login"** button on sign-in and **"⚡ Auto Fill Demo"** on sign-up for rapid testing and demonstrations.
- **Client-Side Session Handling**: Managed seamlessly by [`js/auth-state.js`](file:///f:/Zensoft%20Lab/1%20October/6valley/js/auth-state.js) using browser `localStorage` (`6valley_user`).

### 🛡️ 3. Dynamic Client-Side SVG Captcha (`js/google-recaptcha-init.js`)
- **Self-Contained Security**: Eliminates external CAPTCHA server dependencies.
- **Anti-Bot Distortions**: Generates randomized 4-digit security codes rendered inside SVG canvas with character rotation, random vertical offsets, and wave noise lines.
- **Interactive Controls**: Includes a one-click refresh button (`↻`) and real-time form validation with user-friendly alerts.

### 👤 4. Customer Account Dashboard (`user-account.html` / `profile.html`)
- **Profile Overview**: Displays user contact information, avatar, email, and phone number.
- **Tabbed Interface**:
  - 📦 **My Orders**: Real-time order list with status badges (`Delivered`, `Processing`), dates, order codes, and total amounts.
  - ❤️ **Wishlist**: Saved favorite items and quick-actions.
  - 📍 **Addresses**: Billing and delivery address management.
  - 🎫 **Support Tickets**: Customer inquiries and tickets overview.

### ℹ️ 5. Company Information (`about-us.html`)
- Modern presentation of company history, vision, core values, and customer guarantees.

### ⚡ 6. Cleaned & Optimized Codebase
- **Zero External Trackers**: Fully removed external scraper scripts, Cloudflare challenge beacons, and third-party tracking scripts.
- **Zero Lint Warnings**: CSS and HTML files cleaned of vendor-prefix warnings and empty rulesets.
- **100% Offline Capable**: All core assets (images, icons, fonts, stylesheets, scripts) are locally served.

---

## 📁 Project Structure

```text
6valley/
│
├── index.html                   # Main Home & Storefront page
├── sign-in.html / login.html    # User Login page with Captcha & Demo Login
├── sign-up.html / register.html # User Registration page with Auto-Fill
├── user-account.html / profile.html # User Dashboard (Orders, Profile, Wishlist)
├── about-us.html                # About Us & Company Information page
├── README.md                    # Project documentation
│
├── css/                         # Stylesheets
│   ├── custom.css               # Core project customizations & modal styles
│   ├── style_1.css              # Main theme design system & layout styles
│   ├── home.css                 # Home section specific styles
│   ├── responsive1.css          # Responsive mobile & tablet breakpoints
│   ├── google-recaptcha-init.css# Captcha styling
│   └── intlTelInput_1.css       # International phone input styles
│
├── js/                          # JavaScript modules
│   ├── auth-state.js            # Authentication state & navbar sync manager
│   ├── google-recaptcha-init.js # Dynamic SVG captcha engine
│   └── custom.js                # Core UI scripts and event handlers
│
├── images/                      # Media & Graphics
│   ├── 2024-09-19-66eba5af60616.webp # Promotional modal banner
│   ├── facebook.png / google.png      # Social authentication icons
│   ├── user-vector.svg                # User profile avatar icon
│   └── ...                            # Products, brands & UI banners
│
└── fonts/                       # Icon fonts and web typography
```

---

## 🚀 How to Run Locally

You can run this project locally without any complex build steps or dependencies:

### Method 1: Direct Browser Launch
Simply double-click on [`index.html`](file:///f:/Zensoft%20Lab/1%20October/6valley/index.html) to open the application directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Method 2: Local HTTP Server (Recommended)
Using Node.js, Python, or VS Code Live Server:

```bash
# Using Node.js (npx)
npx serve .

# OR using Python 3
python -m http.server 8080
```
Then navigate to `http://localhost:8080/` in your browser.

---

## 🧪 Demo Credentials & Testing

For fast and convenient testing, use the built-in quick demo credentials:

| Field | Demo Value |
| :--- | :--- |
| **Email** | `demo@user.com` |
| **Password** | `12345678` |
| **Quick Action** | Click the **"⚡ Quick Demo Login"** button on [`sign-in.html`](file:///f:/Zensoft%20Lab/1%20October/6valley/sign-in.html) |

---

## 🎨 Technologies Used

- **Markup**: HTML5 (Semantic & Accessible)
- **Styling**: CSS3 (Flexbox, Grid, Custom Properties, Transitions)
- **Framework**: Bootstrap 4.x
- **Scripting**: Vanilla JavaScript (ES6+), jQuery
- **Icons**: Feather Icons, FontAwesome, SVG Vectors
- **Sliders & UI**: Owl Carousel, Swiper, Toastr Notifications

---

## 📄 License
This project is for demonstration, development, and private commercial storefront usage.
