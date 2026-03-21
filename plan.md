# 28-Day Interview Prep Plan

**Format**: 2 tasks/day · ~1-1.5 hours total  
**Task 1** (Build ~40 min): Hands-on coding — push to a GitHub repo  
**Task 2** (Explain ~20 min): Answer out loud like an interview, then write notes

> Every day builds on the previous. By Day 28, you'll have a deployable full-stack AI app with CI/CD.

---

## WEEK 1 — JavaScript, Node.js & REST APIs

**Theme**: Nail the backend fundamentals interviewers test most

### Day 1 — JS fundamentals & your first route

- **Build**: Create an Express server with a single `GET /healthcheck` route that returns `{ status: "ok", uptime: process.uptime() }`. Add a `POST /echo` route that returns the request body. Use proper status codes.
- **Explain**: What is the event loop in Node.js? Walk through how `setTimeout`, Promises, and `process.nextTick` are prioritized.

### Day 2 — Middleware & error handling

- **Build**: Add a request logger middleware (logs method, URL, timestamp) and a global error handler middleware to yesterday's server. Add a `GET /error` route that deliberately throws, and verify your error handler catches it.
- **Explain**: What's the difference between `app.use()` and `app.get()`? What does `next()` do, and what happens if you forget to call it?

### Day 3 — CRUD API with in-memory store

- **Build**: Create a full CRUD API for a "tasks" resource (`GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`). Use an in-memory array. Add input validation (title required, max 100 chars).
- **Explain**: What is idempotency? Which HTTP methods are idempotent and why does it matter for API design?

### Day 4 — Connect to MongoDB

- **Build**: Replace the in-memory array with MongoDB (use MongoDB Atlas free tier or local Docker). Create a Mongoose schema for tasks with `title`, `completed`, `createdAt`. Refactor routes to use async/await with try-catch.
- **Explain**: What's the difference between SQL and NoSQL? When would you pick MongoDB over PostgreSQL? Relate to your Brinavv experience.

### Day 5 — Controller-Service-Repository pattern

- **Build**: Refactor yesterday's code into the CSR pattern you used at Brinavv — separate `taskController.js`, `taskService.js`, `taskRepository.js`. The controller handles req/res, service has business logic, repository talks to DB.
- **Explain**: Why separate concerns this way? What problems does a tightly coupled monolith cause? (Use your real experience extracting the Employee Management domain.)

### Day 6 — Query params, pagination & filtering

- **Build**: Add `GET /tasks?status=completed&page=1&limit=10&sort=createdAt` with real MongoDB queries. Implement proper pagination response: `{ data: [...], total, page, totalPages }`.
- **Explain**: What's the N+1 query problem? How do aggregation pipelines in MongoDB differ from SQL JOINs?

### Day 7 — Week 1 mini-project

- **Build**: Combine everything into a clean "Task Manager API". Add a `GET /tasks/stats` endpoint using MongoDB aggregation to return counts by status. Write a proper README with API docs. Push the complete project.
- **Explain**: Walk through your entire API architecture as if presenting to an interviewer. Explain each layer, design decision, and tradeoff.

---

## WEEK 2 — React, Auth, Full Stack & Databases

**Theme**: Build the frontend, add auth, connect everything

### Day 8 — React fundamentals

- **Build**: Create a React app (Vite + TypeScript). Build a `TaskList` component that fetches tasks from your Week 1 API and displays them. Use `useState` and `useEffect`. Handle loading and error states.
- **Explain**: What's the difference between `useEffect` with `[]`, `[dep]`, and no array? What causes infinite re-renders?

### Day 9 — Forms & state management

- **Build**: Add a `TaskForm` component to create new tasks. Add inline edit and delete. Implement optimistic updates (UI updates before API confirms, rolls back on error).
- **Explain**: What is "lifting state up" in React? When would you use Context API vs Redux vs just props?

### Day 10 — Custom hooks & API layer

- **Build**: Extract a `useTasks()` custom hook that handles all task CRUD operations. Create an `api.ts` file with an axios instance and interceptors for error handling. Add TypeScript interfaces for Task.
- **Explain**: What are closures in JavaScript? Give 3 real examples. How do closures relate to React hooks?

### Day 11 — Authentication backend

- **Build**: Add `POST /auth/register` and `POST /auth/login` to your API. Hash passwords with bcrypt. Return JWTs. Create auth middleware that verifies tokens on protected routes. Tasks should now belong to a user.
- **Explain**: How does JWT auth work? What's the difference between JWT and session-based auth? What are the security risks of storing JWTs in localStorage vs cookies?

### Day 12 — Authentication frontend

- **Build**: Build Login and Register pages in React. Store the JWT, add it to axios headers via interceptor. Create a `ProtectedRoute` component. Show different UI for logged-in vs anonymous users.
- **Explain**: What is CORS and why does it exist? How do you configure it properly in Express? What's a preflight request?

### Day 13 — PostgreSQL & Prisma

- **Build**: Create a second small API using Fastify + Prisma + PostgreSQL (your resume lists all of these). Model a simple `User -> Posts` relationship. Implement CRUD for posts with proper relations.
- **Explain**: What are database indexes? When should you add them? What's the tradeoff? Explain ACID properties.

### Day 14 — Week 2 mini-project

- **Build**: Polish the full-stack Task Manager. Add: user registration/login, protected routes, filter by status, responsive design with Tailwind. Deploy backend to Railway/Render, frontend to Vercel. Push and document.
- **Explain**: Walk through the full request lifecycle — from the user clicking "Add Task" to the data being saved in MongoDB and the UI updating. Cover every layer.

---

## WEEK 3 — DevOps, Testing & CI/CD

**Theme**: Dockerize, test, and automate everything

### Day 15 — Docker basics

- **Build**: Write a `Dockerfile` for your Task Manager API. Multi-stage build: build stage with dev deps, production stage with only runtime. Add a `.dockerignore`. Build and run locally.
- **Explain**: What's the difference between an image and a container? What are layers in Docker? Why does order of commands in a Dockerfile matter for caching?

### Day 16 — Docker Compose

- **Build**: Create a `docker-compose.yml` that runs your API + MongoDB + Redis (for caching later) together. Use volumes for data persistence. Add environment variables via `.env` file.
- **Explain**: What is container orchestration? Compare Docker Compose vs Kubernetes at a high level. When would you need Kubernetes?

### Day 17 — Unit testing with Jest

- **Build**: Write unit tests for your `taskService.js` layer. Mock the repository. Test: creating a task, validation errors, fetching non-existent task. Aim for 80%+ coverage on the service layer.
- **Explain**: What's the testing pyramid? What's the difference between unit tests, integration tests, and e2e tests? What should each layer test?

### Day 18 — Integration testing with Supertest

- **Build**: Write integration tests for your API endpoints using Supertest. Test the full flow: register → login → create task → get tasks → update → delete. Use a test database.
- **Explain**: What is TDD? Walk through Red-Green-Refactor with a concrete example. When is TDD overkill?

### Day 19 — GitHub Actions CI pipeline

- **Build**: Create `.github/workflows/ci.yml` that on every push: installs deps, runs linting (ESLint), runs unit tests, runs integration tests (spin up MongoDB with a service container), reports coverage.
- **Explain**: What is CI vs CD? What are GitHub Actions runners, jobs, and steps? How do you handle secrets in CI pipelines?

### Day 20 — CD pipeline & deployment

- **Build**: Extend CI to auto-deploy: on push to `main`, build Docker image, push to GitHub Container Registry (or Docker Hub), deploy to Railway/Render via webhook or CLI. Add a staging branch with a separate deployment.
- **Explain**: What is blue-green deployment? What is a canary release? How would you handle database migrations in a CD pipeline?

### Day 21 — Week 3 mini-project

- **Build**: Your Task Manager now has: Dockerized backend, Docker Compose for local dev, unit + integration tests, full CI/CD pipeline, auto-deploy on merge. Add a status badge to README. Write a `CONTRIBUTING.md`.
- **Explain**: A production bug is reported — the task completion endpoint returns 500 for some users. Walk through your debugging process: logs, monitoring, reproducing, fixing, deploying the fix, writing a postmortem.

---

## WEEK 4 — AI Integration, System Design & Interview Ready

**Theme**: Add AI features, practice system design, get interview-sharp

### Day 22 — LLM API basics

- **Build**: Create a new `/ai/summarize` endpoint that accepts text and calls the OpenAI API (or any LLM API) to summarize it. Handle streaming responses. Add rate limiting. Validate input length.
- **Explain**: What is a REST API vs a streaming API? How does Server-Sent Events (SSE) work? How is it different from WebSockets?

### Day 23 — AI-powered task features

- **Build**: Add `POST /tasks/:id/ai-suggest` that takes a task title and uses an LLM to suggest subtasks and time estimates. Cache results in Redis (from your Docker Compose). Show suggestions in the React UI.
- **Explain**: What is prompt engineering? Explain temperature, top-p, and how they affect LLM output. How do you prevent prompt injection?

### Day 24 — RAG basics

- **Build**: Create a `/ai/ask` endpoint that does basic RAG: take a user question, search your tasks database for relevant tasks (text search or simple embedding similarity), include them as context in the LLM prompt, return an AI answer grounded in the user's data.
- **Explain**: What is RAG and why is it used instead of fine-tuning? What are embeddings and vector similarity? Relate to your eVakeel project.

### Day 25 — Frontend AI experience

- **Build**: Add an AI chat sidebar to your Task Manager React app. Users can ask "What are my overdue tasks?" or "Suggest what I should work on next" and get AI-powered responses based on their actual data.
- **Explain**: How do you handle long-running API calls in a frontend? Discuss loading states, streaming UI updates, error boundaries, and optimistic rendering.

### Day 26 — Performance & optimization

- **Build**: Add Redis caching to your most-hit endpoints. Implement cache invalidation on writes. Add response compression. Run a basic load test with `k6` or `autocannon` and document the before/after.
- **Explain**: Design a URL shortener (classic interview question). Walk through: data model, hashing strategy, read/write ratio, caching, database choice, scaling considerations.

### Day 27 — Security hardening

- **Build**: Audit and harden your app: add helmet.js, rate limiting, input sanitization, CSRF protection, secure cookie flags. Add a security-focused test that verifies SQL/NoSQL injection attempts are blocked.
- **Explain**: What are the OWASP Top 10? Explain XSS, CSRF, and injection attacks with examples. How do you store passwords securely? (Mention bcrypt, salting, never rolling your own crypto.)

### Day 28 — Final integration & interview simulation

- **Build**: Final polish: ensure the complete app works end-to-end (register → login → CRUD tasks → AI features → all tests pass → CI/CD deploys). Update portfolio README with architecture diagram, tech stack, and screenshots. This is your showcase project.
- **Explain**: Do a full mock interview with yourself (record it). Cover: (1) Walk me through your architecture. (2) Tell me about a tough bug you fixed at Brinavv. (3) Design a real-time notification system. (4) How would you scale this app to 10K users?

---

## Daily Checklist

```
[ ] Task 1 completed & code pushed to GitHub
[ ] Task 2 answered out loud (timed: 5 min per answer)
[ ] Quick review: what did yesterday's task teach me that I used today?
[ ] Note any concept I was shaky on → review tomorrow morning
```

## Resources to Keep Open

- **Frontend**: frontendinterviewhandbook.com, GreatFrontEnd
- **Backend**: github.com/arialdomartini/Back-End-Developer-Interview-Questions
- **DevOps**: github.com/devops-interviews/devops-interview-questions (115 real questions with walkthroughs)
- **AI/LLM**: datacamp.com/blog/llm-interview-questions
- **Your resume projects**: Be ready to deep-dive into PanditAI, eVakeel, and Brinavv at any point

## By Day 28 You'll Have

1. A full-stack app with auth, CRUD, AI features, and real-time capabilities
2. A Dockerized, tested, CI/CD-deployed production-grade project
3. 28 interview questions practiced and answered
4. A GitHub repo that demonstrates exactly the skills these roles demand
