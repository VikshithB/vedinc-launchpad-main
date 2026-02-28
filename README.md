# Vedinc Launchpad

## Project Overview

Vedinc Launchpad is a full-stack web application designed to serve as a structured platform for launching, managing, or showcasing projects and user interactions. The application uses a monorepo structure with the frontend and backend managed together.

---

## Architecture

The project follows a client-server architecture using **npm workspaces**:

### Frontend (Root)
- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **ShadCN UI** components
- Runs on port **8080** during development
- API requests to `/api/*` are proxied to the backend

### Backend (`server/`)
- **Express** + **TypeScript**
- **Prisma ORM** with Supabase (PostgreSQL)
- Runs on port **5000** during development
- RESTful API architecture

---

## Folder Structure

```
vedinc-launchpad-main/
├── package.json              # Root workspace orchestrator
├── index.html                # Frontend entry
├── vite.config.ts            # Vite config with API proxy
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # Frontend TypeScript config
├── tsconfig.app.json
├── tsconfig.node.json
├── components.json           # ShadCN UI config
├── postcss.config.js
├── eslint.config.js
├── vitest.config.ts
├── public/                   # Static assets
├── src/                      # Frontend source code
│   ├── components/           # Reusable UI components
│   ├── pages/                # Application pages/routes
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities
│   └── assets/               # Static assets
├── server/                   # Backend (npm workspace)
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/               # Prisma schema & migrations
│   └── src/                  # Backend source code
│       ├── modules/          # Feature modules (auth, courses, etc.)
│       ├── middlewares/       # Express middleware
│       ├── config/           # Environment config
│       ├── utils/            # Utilities
│       └── server.ts         # Entry point
└── README.md
```

---

## Installation and Setup

### Prerequisites
- Node.js (v18+)
- npm (v7+ for workspaces support)

### Clone and Install

```bash
git clone https://github.com/Simeen19/vedinc-launchpad-main.git
cd vedinc-launchpad-main
npm install
```

> **One `npm install` from the root installs dependencies for both frontend and backend.**

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Environment Variables

Create `.env` files as needed:

**Root `.env`** (frontend):
```
VITE_API_URL=http://localhost:5000
```

**`server/.env`** (backend):
```
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:8080
```

---

## Running the Application

### Start Both (Frontend + Backend)

```bash
npm run dev:all
```

### Start Frontend Only

```bash
npm run dev
```
Frontend runs at: `http://localhost:8080`

### Start Backend Only

```bash
npm run dev:server
```
Backend runs at: `http://localhost:5000`

---

## Building for Production

### Build Frontend

```bash
npm run build
```

### Build Backend

```bash
npm run build:server
```

### Build Both

```bash
npm run build:all
```

---

## Available Scripts

| Script               | Description                                |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start frontend dev server (Vite)           |
| `npm run dev:server` | Start backend dev server (ts-node-dev)     |
| `npm run dev:all`    | Start both frontend and backend            |
| `npm run build`      | Build frontend for production              |
| `npm run build:server` | Compile backend TypeScript               |
| `npm run build:all`  | Build both frontend and backend            |
| `npm run start:server` | Start compiled backend (production)      |
| `npm run test`       | Run frontend tests (vitest)                |
| `npm run lint`       | Run ESLint                                 |
| `npm run prisma:generate` | Generate Prisma client              |
| `npm run prisma:migrate`  | Run Prisma migrations               |

---

## API Structure

| Endpoint              | Method | Description              |
| --------------------- | ------ | ------------------------ |
| /api/auth/login       | POST   | Authenticate user        |
| /api/auth/register    | POST   | Register new user        |
| /api/users            | GET    | User management          |
| /api/courses          | GET    | List courses             |
| /api/enrollments      | GET    | Enrollment management    |
| /api/admin            | GET    | Admin panel endpoints    |
| /api/modules          | GET    | Course modules           |
| /api/lessons          | GET    | Course lessons           |
| /api/categories       | GET    | Course categories        |
| /api/instructor       | GET    | Instructor endpoints     |

---

## Deployment

1. Host the backend on platforms such as Render, Railway, or Heroku.
2. Host the frontend on Vercel, Netlify, or similar platforms.
3. Configure environment variables in the hosting dashboard.
4. Update the frontend API base URL to point to the deployed backend server.

---

## Maintainer

Simeen Ali
Bhakta Ranjan Sahu
