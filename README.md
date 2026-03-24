# AI Interview Copilot

Full-stack interview prep app: **Spring Boot** (JWT + JPA), **React** (Vite + Tailwind), **PostgreSQL**, and **Groq** for AI-generated roadmaps tailored to your resume, company, and role.

## ▶️ Demo Video

🎥 Short demo video (60–70 seconds) showing:
- Sign up
- How to generate preparation Plan
- How I build

**https://drive.google.com/file/d/11gO18mUmLRy-MPVTTWdJ_ef22SEtP7Ts/view?usp=drive_link**  
---
## ▶️ Live Demo

🔗 **https://ai-interview-copilot-sooty.vercel.app**

> Note: The backend is hosted on a server with cold-start behavior, so the first request may take a few seconds to respond. Subsequent requests will be faster.
  
---
## Repository layout

| Path | Description |
|------|-------------|
| `backend/` | Spring Boot API (`/api/auth/*`, `/api/interview/*`) |
| `frontend/` | React SPA |

## Prerequisites

- Java 17+ (use **JDK 17 or 21** to build; **JDK 25** currently breaks Lombok during compile — set `JAVA_HOME` to a JDK 17 install if your default is newer)
- Maven 3.9+
- Node 20+ (for the frontend)
- PostgreSQL 15+ **or** MySQL 8+ **or** the in-memory H2 profile for a quick try

## Backend setup

1. Create a database:

   ```sql
   CREATE DATABASE interview_copilot;
   ```

2. Configure environment (or edit `backend/src/main/resources/application.properties`):

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | JDBC URL (PostgreSQL default; for MySQL use `jdbc:mysql://localhost:3306/interview_copilot`) |
   | `DATABASE_USER` / `DATABASE_PASSWORD` | DB credentials |
   | `JWT_SECRET` | At least 32 characters for HS256 |
   | `GROQ_API_KEY` | [Groq API key](https://console.groq.com/) — if omitted, a **mock** sample response is used |
   | `GROQ_MODEL` | Optional override (default `llama-3.3-70b-versatile`) |

3. Run:

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   **Quick demo without PostgreSQL:**

   ```bash
   cd backend
   mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=dev-h2
   ```

   The API listens on **http://localhost:8080**.

## Frontend setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The UI runs at **http://localhost:5173**. Point `VITE_API_URL` at your API (default `http://localhost:8080`).

## API summary

- `POST /api/auth/signup` — JSON `{ "email", "password" }`
- `POST /api/auth/login` — same body; returns JWT `Bearer` token
- `POST /api/interview/analyze` — `multipart/form-data`: `resume` (PDF) + `companyName`, `roleTitle`, `timeAvailable`, optional `companyWebsite`, `jobDescription`, `extraContext`
- `GET /api/interview/{id}` — full result for the authenticated user
- `GET /api/interview/history` — list of past sessions

## Mock AI response

With no `GROQ_API_KEY`, the backend uses `sample-mock-ai-response.json` on the classpath. Replace or extend that file to tune demo output.

## Docker (PostgreSQL only)

From the repo root:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432` with user/password `postgres` / `postgres` and database `interview_copilot` (see `docker-compose.yml`).

## Production notes

- Set strong `JWT_SECRET`, HTTPS, and restrict CORS origins in `SecurityConfig` (currently allows `localhost` patterns for development).
- Run the frontend build behind any static host or CDN; configure `VITE_API_URL` at build time for the production API base URL.
- Use managed PostgreSQL and inject secrets via your platform’s env/config store.

---

Made by **Vishvajit Jadhav**.
