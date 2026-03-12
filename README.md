# The Village Restaurant & Lounge — Website

A clean, fully static website for **The Village Restaurant & Lounge**, located in Benin City, Nigeria.  
Built with plain HTML, CSS, and vanilla JavaScript — **no build step, no dependencies, no frameworks**.

---

## 🌐 Live Demo

Deploy to GitHub Pages and your site will be live at:  
`https://<your-github-username>.github.io/<repository-name>/`

---

## 📁 Project Structure

```
website-project/
│
├── index.html          ← Main HTML page (all sections)
├── style.css           ← All styles (custom properties, layout, responsive)
├── script.js           ← All interactivity (nav, form, animations)
│
├── assets/
│   ├── images/         ← Place any local images here
│   └── icons/          ← Place any local icons/SVGs here
│
├── README.md           ← This file
└── DEPLOY_ON_GITHUB.txt ← Step-by-step beginner GitHub Pages guide
```

---

## ✅ Features

- **Responsive design** — looks great on phones, tablets, and desktops
- **Fixed navigation** with smooth-scroll and mobile hamburger menu
- **Hero section** with full-screen background image
- **About section** with feature cards and Our Story
- **Menu section** with lunch and dinner listings
- **Highlights section** with amenities and payment methods
- **Booking form** that sends a pre-filled WhatsApp message to the restaurant
- **Location section** with embedded Google Map and address
- **Photo gallery** with hover effects
- **Footer** with contact info, hours, and social links
- **Scroll-triggered fade-in animations** via Intersection Observer
- **Accessibility** — semantic HTML, ARIA labels, skip link, keyboard navigation

---

## 🚀 How to Deploy on GitHub Pages

See the detailed beginner-friendly guide in **`DEPLOY_ON_GITHUB.txt`**.

**Short version (for experienced users):**

1. Create a new GitHub repository
2. Upload all project files to the repository root
3. Go to **Settings → Pages → Branch: main → / (root)** → Save
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

---

## ✏️ How to Edit the Website

### Change text content
Open `index.html` in any text editor and find the section you want to edit. Each section is clearly labelled with an HTML comment, e.g.:

```html
<!-- =====================
     HERO SECTION
======================= -->
```

### Change colors
Open `style.css` and edit the CSS variables at the very top of the file:

```css
:root {
  --color-amber:      #d97706;   /* main gold/amber color */
  --color-amber-dark: #b45309;   /* hover color */
  /* ... */
}
```

### Change fonts
The fonts are loaded from Google Fonts in `index.html`. Find this line:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display...
```

Replace with any Google Fonts URL you prefer. Then update `style.css`:

```css
--font-display: 'YourHeadingFont', serif;
--font-body:    'YourBodyFont', sans-serif;
```

### Change the phone number
Search for `09151820000` in `index.html` and `script.js` and replace it with the actual number.  
In `script.js`, also update the WhatsApp number (international format):

```js
const phoneNumber = '2349151820000'; // 234 = Nigeria country code
```

### Change gallery images
In `index.html`, find the Gallery section. Each image uses a Pexels URL. Replace the `src` attributes with your own image URLs or local image paths (e.g., `assets/images/photo1.jpg`).

### Update the Google Map
In `index.html`, find the `<iframe>` in the Location section and replace the `src` with a new Google Maps embed URL for the exact address.

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling, layout (CSS Grid & Flexbox), animations |
| Vanilla JavaScript (ES6+) | Interactivity, form handling, scroll effects |
| Google Fonts | Typography (Playfair Display + Lato) |
| Pexels (CDN) | Placeholder photography |
| Google Maps Embed | Interactive location map |
| WhatsApp API | Booking form submission |

---

## 📄 License

This project is open for personal and commercial use. Remove placeholder images and replace with your own before publishing.
