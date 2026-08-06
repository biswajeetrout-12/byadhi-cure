# Byadhi Cure Lab Frontend

Build only the frontend UI design and project structure for a professional pharmaceutical company website.

Company Name:

Byadhi Cure Lab Private Limited

Important:

This should NOT be a single-page scrolling website.

Create a proper multi-page React application where every major section has its own route and is controlled through the navigation bar.

Technology:

- React + Vite

- React Router for routing

- Tailwind CSS for styling

- Component-based architecture

- Responsive design

Website Theme:

Design a premium pharmaceutical company website.

The design should represent:

- Trust

- Healthcare excellence

- Professional pharmaceutical manufacturing

- Quality and reliability

Visual style:

- Clean white background

- Medical blue and green color palette

- Professional typography

- Modern but corporate appearance

- Subtle animations only

- Avoid flashy startup landing page style

Navigation Bar:

Create a fixed responsive navbar.

Left:

- Company logo

- Byadhi Cure Lab Private Limited

Navigation items:

Home

About Us

Products

Manufacturing

Quality & Certifications

Gallery

Contact Us

Login

Requirements:

- Active route highlighting

- Mobile hamburger menu

- Professional footer

- Separate page navigation (no scrolling between sections)

====================================

PUBLIC WEBSITE PAGES

====================================

1. Home Page (/)

Design:

Hero Section:

- Large pharmaceutical manufacturing image

- Company name:

  "Byadhi Cure Lab Private Limited"

- Short company introduction

- CTA buttons:

  - Explore Products

  - Contact Us

Company Highlights section:

Cards showing:

- Years of experience

- Number of products

- Quality standards

- Manufacturing capabilities

Featured Products Preview:

- Display selected products

- Product cards should be reusable components

Manufacturing Overview:

- Facility images

- Short description

Quality Section:

- Certifications preview

Footer:

- Company information

- Quick links

- Contact details

- Social media placeholders

====================================

2. About Us Page (/about)

Design:

Company Introduction:

- Detailed company overview

- Mission

- Vision

- Values

Director Section:

Create a professional leadership section.

Include:

- Director photo

- Director name

- Designation

- Short biography/message

Layout:

- Professional profile card

- Image on one side

- Description on the other side

Company Journey:

- Timeline style design

Infrastructure overview section

====================================

3. Products Page (/products)

Important:

Create a dynamic product listing UI.

For now display exactly 6 products using dummy data.

Each product card should contain:

- Product image

- Product name

- Short description

- Read More button

Product cards:

Desktop:

3 cards per row

Tablet:

2 cards per row

Mobile:

1 card per row

Example:

Product Card:

-----------------

Image

Product Name

Short description

[Read More]

-----------------

Important:

Do not create product details inside the card.

The "Read More" button should navigate to:

/products/:id

====================================

4. Product Details Page (/products/:id)

Create a complete product information page.

Design should support future dynamic data from backend.

Sections:

- Large product image

- Product name

- Product category

- Product description

- Composition/details

- Uses/applications

- Benefits

- Dosage information placeholder

- Packaging information

- Storage information

- Manufacturing details

- Related products

- Download brochure button

- Product enquiry button

Data should later come from backend API.

====================================

5. Manufacturing Page (/manufacturing)

Sections:

- Manufacturing facility images

- Production process

- Equipment information

- Quality control process

- Safety standards

- Manufacturing capabilities

====================================

6. Quality & Certifications Page (/quality)

Sections:

- Quality policy

- Certifications cards

- Regulatory compliance

- Certificate gallery

Design certificate cards with:

- Certificate image

- Certificate name

- Description

====================================

7. Gallery Page (/gallery)

Create image gallery design.

Categories:

- Manufacturing Facility

- Products

- Infrastructure

- Events

Use dynamic image placeholders.

Later images will come from Cloudinary.

====================================

8. Contact Page (/contact)

Sections:

Company contact information:

- Address

- Phone

- Email

Add:

- Contact enquiry form UI

- Embedded map placeholder

====================================

9. Login Page (/login)

Professional authentication UI.

Later authentication will support:

- Customer login

- Superadmin login

Design:

- Email input

- Password input

- Login button

- Forgot password

====================================

ADMIN DASHBOARD UI

====================================

Create separate admin layout.

Route:

/admin/dashboard

Admin layout:

- Sidebar

- Header

- Content area

Sidebar:

Dashboard

Company Information

Products Management

Gallery Management

Certifications

Enquiries

Users

Settings

Admin Product Management UI:

Route:

/admin/products

Design:

- Product table

- Add product button

- Edit button

- Delete button

- Search/filter

Product form UI:

Fields:

- Product name

- Product image upload

- Short description

- Full description

- Category

- Composition

- Uses

- Benefits

- Packaging

- Storage

====================================

FRONTEND STRUCTURE

====================================

frontend/

src/

├── assets/

├── components/

│   ├── common/

│   │   ├── Navbar.jsx

│   │   ├── Footer.jsx

│   │   └── Button.jsx

│   ├── products/

│   │   ├── ProductCard.jsx

│   │   └── ProductGrid.jsx

├── pages/

│   ├── public/

│   │   ├── Home.jsx

│   │   ├── About.jsx

│   │   ├── Products.jsx

│   │   ├── ProductDetails.jsx

│   │   ├── Manufacturing.jsx

│   │   ├── Quality.jsx

│   │   ├── Gallery.jsx

│   │   ├── Contact.jsx

│   │   └── Login.jsx

│   └── admin/

│       ├── AdminLayout.jsx

│       ├── Dashboard.jsx

│       ├── ProductsManagement.jsx

│       ├── GalleryManagement.jsx

│       ├── Certifications.jsx

│       ├── Enquiries.jsx

│       └── Users.jsx

├── services/

│   └── api.js

├── routes/

│   └── AppRoutes.jsx

└── App.jsx

====================================

BACKEND FOLDER PREPARATION ONLY

====================================

backend/

├── controllers/

├── models/

├── routes/

├── middleware/

├── config/

├── services/

├── utils/

├── seed/

└── server.js

Important Development Rules:

- Do not hardcode editable company information.

- Do not hardcode products inside components.

- Use temporary dummy JSON data for UI demonstration.

- Prepare components so they can consume backend API data later.

- Keep product cards reusable.

- Product details page must be separate from product listing.

- Keep admin dashboard UI separate from public website.

- Do not implement backend functionality yet.

- Do not create a single page scrolling website.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1e34924c-b5cd-4f4b-9718-5a7e93a9d48d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
