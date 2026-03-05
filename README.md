# AdventuringGhost Portfolio v2.0

This is the source code for my personal portfolio website, built to showcase my projects, skills, and experience as a Cloud & DevOps Engineer.

**Live Site:** [https://adventuringghost.com](https://adventuringghost.com)

## ✨ Features

- **Responsive Design:** Fully responsive layout that works on all devices.
- **Dynamic Project Pages:** Case studies for projects are dynamically generated from content files.
- **Syntax Highlighting:** Code blocks are beautifully highlighted using [Shiki](https://shiki.style/).
- **Dark Mode Ready:** The design is built with a dark theme in mind.
- **SEO Optimized:** Includes JSON-LD for better search engine visibility.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Built with primitives inspired by [Radix UI](https://www.radix-ui.com/).
- **Icons:** [Lucide React](https://lucide.dev/)
- **Syntax Highlighting:** [Shiki](https://shiki.style/)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚢 Deployment

The site is statically exported using `npm run build` (configured with `output: 'export'` in `next.config.mjs`).

The static files in the `out/` directory are deployed to an **AWS S3 bucket** configured for static website hosting. An **AWS CloudFront** distribution sits in front of the S3 bucket to provide global CDN caching and a custom domain with HTTPS.

## 📂 Project Structure

A brief overview of the key directories:

```
.
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── projects/[slug]/  # Dynamic project pages
│   │   └── ...
│   ├── components/         # Reusable React components
│   │   └── ui/             # Core UI elements (Button, Card, etc.)
│   └── content/            # Site content, including project details
├── public/                 # Static assets like images and resume
└── mdx-components.tsx      # Custom components for MDX rendering
```
