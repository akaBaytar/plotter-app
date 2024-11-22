# Plotter

> Plotter is your all-in-one workspace for note-taking, task management, and project organization. Collaborate, plan and stay productive with ease using Plotter’s intuitive interface and powerful tools.

## Live Demo

- You can access the live demo via [Vercel](https://burakbilgili-plotter.vercel.app/).

## Screen

[<img src="/public/screen.png" />](https://burakbilgili-plotter.vercel.app/)


## Features

**Here are some of the current features that Plotter has:**

- [x] User authentication with Clerk
- [x] Route protection
- [x] User profile modal
- [x] Rich text editor
- [x] Publish notes as a public route
- [x] Cover image upload
- [x] Responsive design

**Plotter uses the following technologies:**

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Convex](https://www.convex.dev/)
- [EdgeStore](https://edgestore.dev/)
- [Blocknote](https://www.blocknotejs.org/)

## Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/en) version 20 or higher.
- Sign up and create a new project at [Clerk](https://dashboard.clerk.com/sign-up).
- Sign up and create a new project at [Convex](https://www.convex.dev/start).
- Sign up and create a new project at [Edgestore](https://dashboard.edgestore.dev/sign-upr).




#### `.env` File

Create `.env` file and fill in the following environment variables:

```
CONVEX_DEPLOYMENT=[YOUR_CONVEX_DEV_KEY]
NEXT_PUBLIC_CONVEX_URL=[YOUR_CONVEX_DEV_URL]

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[YOUR_CLERK_KEY]
CLERK_SECRET_KEY=[YOUR_CLERK_SECRET]

EDGE_STORE_ACCESS_KEY=[YOUR_EDGESTORE_KEY]
EDGE_STORE_SECRET_KEY=[YOUR_EDGESTORE_SECRET]
```

#### Install Dependencies

```bash
npm install
```

#### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
