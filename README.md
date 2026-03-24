GRIDLOCK

ACM SIGCHI Student Chapter — Official Event Website

GRIDLOCK is a structured, multi-stage technical challenge organized by the ACM SIGCHI Student Chapter. The event combines competitive programming with a campus-based offline capture-the-flag experience designed to test logical reasoning, debugging ability, and applied problem-solving under time constraints.

This repository contains the complete source code for the official event website, including the registration system, backend logic, and administrative oversight interface.

⸻

Event Structure

GRIDLOCK is designed as a two-phase technical engagement model.

Phase 1 — Codeathon (Elimination Round)

Duration: 2 Hours 15 Minutes
Mode: Team-based (2–4 members)

Participants solve a curated set of technical challenges, including:
	•	Algorithmic programming problems
	•	Code debugging scenarios
	•	Cipher-based decryption tasks
	•	Logical reasoning puzzles

Top-performing teams qualify for Phase 2.

Critical detail:
Clues required for the next stage are embedded within correct Phase 1 solutions. Teams must solve accurately and interpret carefully.

Coding concludes at the end of this phase. No further coding is required in subsequent rounds.

⸻

Phase 2 — Offline Capture the Flag

Qualified teams proceed to a campus-based operational challenge.

Structure:
	•	Three designated campus buildings
	•	One hidden Power Token per building
	•	Sequential discovery based on decoded hints from Phase 1

Teams must:
	•	Interpret clues derived from Codeathon outputs
	•	Navigate physically across assigned locations
	•	Locate and retrieve three hidden tokens
	•	Complete the final objective

Winners are determined by speed, precision, and correctness.

⸻

System Architecture

The GRIDLOCK website is built using a modern full-stack architecture optimized for reliability and simplicity at event scale (250–300 participants).

Frontend
	•	Next.js (App Router)
	•	React (TypeScript)
	•	Tailwind CSS
	•	Framer Motion

The frontend handles:
	•	Landing page and event narrative
	•	Registration modal workflow
	•	Phase progression UI
	•	Animated transitions and UI state management

⸻

Backend
	•	Next.js API Routes
	•	Supabase (PostgreSQL)

The backend is responsible for:
	•	Team registration persistence
	•	Registration cap enforcement
	•	Duplicate submission prevention
	•	Administrative data retrieval
	•	Secure environment variable handling

No external server infrastructure is required. The system is fully serverless and optimized for deployment on Vercel.

⸻

Database Design

The primary table used for registration storage:

teams

Fields include:
	•	id (UUID, primary key)
	•	team_name
	•	faction
	•	leader_name
	•	leader_reg_no (unique)
	•	leader_email (unique)
	•	leader_phone
	•	leader_department
	•	leader_year
	•	advisor_name
	•	advisor_email
	•	members (JSONB array)
	•	created_at (timestamp)

Registration is capped at approximately 100 teams to maintain the 250–300 participant limit.

Server-side validation ensures:
	•	Proper email formatting
	•	Valid registration number format
	•	Required fields completion
	•	Maximum team size enforcement

⸻

Administrative Oversight

The repository includes administrative endpoints for:
	•	Viewing registered teams
	•	Monitoring submission timestamps
	•	Managing event oversight

Administrative routes are protected and operate using Supabase service role keys stored securely in environment variables.

⸻

Local Development

Clone the repository:

git clone https://github.com/your-username/ACM-GridLock-Event-Website.git
cd ACM-GridLock-Event-Website

Install dependencies:

npm install

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

Start development server:

npm run dev

Application will run at:

http://localhost:3000


⸻

Deployment

This project is configured for deployment on Vercel.

Deployment steps:
	1.	Connect repository to Vercel
	2.	Configure environment variables in the Vercel dashboard
	3.	Deploy

The backend uses serverless functions, ensuring scalability without additional configuration.

⸻

Design Philosophy

GRIDLOCK’s system architecture prioritizes:
	•	Simplicity over unnecessary abstraction
	•	Stability during peak registration
	•	Clear separation between frontend UI and backend logic
	•	Minimal infrastructure complexity
	•	Maintainability for future event iterations

The goal is operational reliability during a live academic event rather than experimental architectural complexity.

⸻

License

This project is developed for the ACM SIGCHI Student Chapter event GRIDLOCK.
Usage is restricted to event operations and affiliated academic purposes.

⸻
