# G-Scores

G-Scores is my submission for the Golden Owl Web Developer Intern assignment. The application uses the 2024 Vietnam National High School Exam dataset in `dataset/diem_thi_thpt_2024.csv`.

## Demo

- Website: https://webdev-intern-assignment-3-theta.vercel.app

## Main Features

- Import the CSV dataset into PostgreSQL with Prisma migration and seed.
- Search for a student's scores by registration number.
- Count student scores by subject in four ranges:
  - Greater than or equal to 8
  - Greater than or equal to 6 and less than 8
  - Greater than or equal to 4 and less than 6
  - Less than 4
- Display the score distribution as a chart.
- Display the top 10 A00 students based on Mathematics, Physics, and Chemistry scores.
- Support desktop and mobile layouts.

## Tech Stack

### Frontend

- Next.js, React, TypeScript
- Tailwind CSS, SCSS
- ApexCharts
- Sonner

### Backend

- Node.js, Express, TypeScript
- Prisma ORM
- PostgreSQL on Neon
- CSV Parse

## Local Setup

Requirements: Node.js 22+, Yarn, and a PostgreSQL database.

### 1. Environment Variables

Create `backend/.env`:

```env
port=5000
urlFrontend=http://localhost:3000
DATABASE_URL=your_database_connection_string
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_URL_BACKEND=http://localhost:5000
```

### 2. Start the Backend

```bash
cd backend
yarn install
yarn prisma generate
yarn prisma migrate deploy
yarn seed
yarn start
```

`yarn seed` imports the CSV dataset and only needs to be run when the database has not been populated.

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend
yarn install
yarn dev
```

Open http://localhost:3000.

## Docker

The Docker setup runs the frontend and backend. PostgreSQL remains an external service configured through `backend/.env`.

Make sure the database has been migrated and seeded, then run:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Stop the containers with:

```bash
docker compose down
```
