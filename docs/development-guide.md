# Development Guide

Install backend dependencies:

```bash
cd server
npm install
```

Run the backend:

```bash
npm run dev
```

From the repository root, serve the static frontend:

```bash
npm run dev:client
```

Run checks:

```bash
npm run check:syntax
npm test
```

Keep frontend code as browser ES modules. Keep backend code as CommonJS.
