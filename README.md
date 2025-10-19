
🧩 Dynamic UI Editor for Customizable Components

A React-based Dynamic UI Editor that allows real-time customization of a product interface inspired by a given Figma design.
The editor provides full control over typography, buttons, layouts, galleries, and colors, with live preview and layout switching between Desktop and iPhone views.

🚀 Project Overview

Modern UI designs often require flexibility — designers and clients need to adjust styles, spacing, or layouts dynamically without editing code.
This project simulates that real-world scenario: building a no-code interface that allows users to visually tweak a product UI and immediately see updates in the preview panel.

Users can:

Change fonts, font weights, and sizes.

Customize button radius, alignment, shadow, and colors.

Adjust image gallery alignment, spacing, and border radius.

Edit card layout, container padding, and stroke.

Switch between two layout variants and two device previews (Desktop / iPhone).

Export current design configuration as JSON.

🧠 Tech Stack

React 18

Zustand (state management)

Tailwind CSS (utility styling)

Lucide React (icons)

Google Fonts (Inter, Roboto, Poppins, Montserrat, Lato, Nunito, Merriweather, etc.)

🧩 Folder Structure
src/
├── components/
│   ├── EditorPanel.jsx
│   ├── PreviewCard.jsx
│   ├── IphonePreviewCard.jsx
│   ├── Dashboard.jsx
│   ├── ColorPickerGrid.jsx
│   └── Gallery.jsx
├── store/
│   └── uistore.js
└── App.jsx

⚙️ Component Overview
1. EditorPanel.jsx

Interactive control panel where users customize properties.

Typography: font family, weight, size

Button: border radius, shadow, alignment, background, text color

Gallery: alignment, spacing, image radius

Layout: card radius, padding, section background

Stroke: color, weight

Layout Variant: switch between Variant A / Variant B

Export JSON & Reset controls

2. PreviewCard.jsx (Desktop View)

Main interactive product card design

Shows chair image, customization sections, and pricing area

Dynamically re-renders with all editor changes

3. IphonePreviewCard.jsx (iPhone View)

iPhone-sized container (390×844px)

Image at top (~30% height)

Compact UI below for mobile preview

Displays stacked thumbnail “folder” preview

4. useUIStore.js

Zustand global store managing all editable states:

fontFamily, fontWeight, fontSize,
btnBg, btnText, btnAlign, btnShadow,
gallerySpacing, imageRadius, galleryAlign,
cardRadius, containerPadding, sectionBg,
strokeColor, strokeWeight, layoutVariant

🧱 Key Features
Feature	Description
🎨 Dynamic Styling	Every control instantly updates the preview card
🔁 Live Layout Switching	Switch between two layout variants (A/B)
📱 Responsive Previews	Toggle between Desktop and iPhone views
🧾 Export JSON	Download your configuration for reuse
💾 Reset Button	Restore default UI configuration
💡 Google Fonts Integration	Fonts loaded dynamically and selectable
🖼️ Thumbnail Folder Preview	Realistic stacked mini-images with count badge
🧩 How It Works

The EditorPanel uses Zustand to update shared state via:

set({ fontSize: 20 });


The PreviewCard and IphonePreviewCard read state directly from the store:

const { fontSize, btnBg } = useUIStore();


Each UI property (color, font, size, etc.) updates live using inline styles and React state.

Layout variants are toggled with:

layoutVariant: 'variantA' | 'variantB'


Users can export settings as JSON for future restoration.

🧰 Setup Instructions
1. Clone the repository
git clone https://github.com/yourusername/dynamic-ui-editor.git
cd dynamic-ui-editor

2. Install dependencies
npm install

3. Run the development server
npm run dev

4. Open in browser

Visit http://localhost:5173
 (Vite default)

🧩 Fonts Setup

Add the following inside <head> of your public/index.html:

<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Roboto:wght@400;500;700&family=Poppins:wght@400;600;700&family=Montserrat:wght@400;600;700&family=Lato:wght@400;700&family=Nunito:wght@400;600;700&family=Merriweather:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap"
  rel="stylesheet"
/>

🧠 Design Decisions

Zustand was chosen over Redux for simplicity and performance in UI state handling.

Two layout modes (A/B) demonstrate dynamic layout configuration without modifying code.

Device toggle (Desktop/iPhone) enhances UX preview flexibility.

Export JSON improves reusability of custom UI configurations.

🎯 Evaluation Alignment
Criterion	Implementation
Functionality	Meets all customization & preview requirements
Flexibility	Supports multiple devices & layouts dynamically
Code Quality	Modular, reusable React components
UI/UX	Smooth, intuitive editor controls
Creativity	Folder-style thumbnail stack, iPhone preview toggle
🧑‍💻 Author

Jaspreet Singh
Frontend Developer | React Enthusiast
📧 jsingh3_be22@thapar.edu
