# Project Report: Sammy's Grill Web Application

## 1. Introduction
Sammy's Grill is a modern, responsive, and highly interactive restaurant web application. The primary objective of this project was to provide a premium digital presence for the restaurant, allowing customers to easily view the menu, browse a dynamic image gallery, and seamlessly book tables online. The application features a robust real-time backend that securely manages incoming reservations and contact messages.

## 2. Tools and Technologies Used
The project was built utilizing a modern, full-stack web development environment:
* **Frontend Framework:** Next.js 14 (App Router) & React 18
* **Styling:** Tailwind CSS (for responsive, utility-first styling) & vanilla CSS
* **Animations:** Framer Motion (for smooth, dynamic scroll animations and page transitions)
* **Backend / Database:** Supabase (PostgreSQL database for reservations and contact data)
* **Deployment & Hosting:** Vercel
* **Version Control:** Git & GitHub

## 3. Modern Web Development Workflow
The A-to-Z process of creating and deploying the website followed industry-standard practices:

**Step 1: Project Initialization**
* Bootstrapped a new Next.js 14 project using `create-next-app` with TypeScript and Tailwind CSS enabled.
* Cleaned up boilerplate code and organized the directory structure (`src/components`, `src/app`, `src/lib`).

**Step 2: Frontend Development & UI Design**
* Developed reusable React components: `Navbar`, `Hero`, `Menu`, `Gallery`, `Reservation`, `Contact`, and `Footer`.
* Applied premium dark-theme branding and customized typography using Tailwind.
* Integrated Framer Motion to create engaging micro-interactions, such as fading text and smooth sliding carousels.
* Updated standard menu pricing to utilize local currency formatting (Rs.).

**Step 3: Backend & Database Integration (Supabase)**
* Created a new Supabase project and securely routed it to the Next.js application using environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
* Ran a robust `schema.sql` script to generate the `reservations` and `contacts` PostgreSQL tables with strict data validation.
* Deployed secure backend API routes (`/api/reservations` and `/api/contact`) that write directly to the database.
* Successfully resolved Row-Level Security (RLS) policies by configuring a **Service Role Key** inside the secure server environment, ensuring foolproof data insertion while protecting the database from client-side manipulation.

**Step 4: Version Control & CI/CD Deployment**
* Initialized a Git repository and pushed the entire source code to GitHub.
* Linked the GitHub repository directly to Vercel, enabling automatic CI/CD (Continuous Integration/Continuous Deployment). 
* Finalized the production build by dynamically configuring Vercel's Environment Variables and triggering standard redeployments.

## 4. Screenshots
*(Note: Please insert your actual project screenshots below)*

* **Figure 1:** `[Insert Screenshot of the Hero Section / Homepage]`
* **Figure 2:** `[Insert Screenshot of the interactive Food Menu]`
* **Figure 3:** `[Insert Screenshot of the Reservation Booking Form]`
* **Figure 4:** `[Insert Screenshot of the Supabase Database / Vercel Dashboard]`

## 5. Conclusion
The Sammy's Grill project successfully demonstrates a complete end-to-end modern web application. By leveraging Next.js for high-performance server-side rendering, Tailwind CSS for beautiful UI layouts, and Supabase for secure data management, the restaurant now boasts a highly scalable, enterprise-grade digital platform. The automated Vercel deployment pipeline currently ensures that any future updates to the GitHub repository are seamlessly released into production.

## 6. References
* Next.js Documentation: https://nextjs.org/docs
* Tailwind CSS Documentation: https://tailwindcss.com/docs
* Supabase Database Reference: https://supabase.com/docs
* Framer Motion Library: https://www.framer.com/motion/
* Vercel Platform: https://vercel.com/docs
