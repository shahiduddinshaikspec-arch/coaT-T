# COA Study Sprint

A calm, offline-first study web app built from `COA_Answer_Key_SR25.docx` for **Computer Organization and Architecture (AS25-05PC02)** — designed for a student starting from zero and preparing for an upcoming exam.

## What’s Inside

- **Home Screen & Editable Exam Countdown:** Defaults to the upcoming Thursday at **10:00 a.m. Asia/Kolkata (IST)** and lets you edit date & time anytime, view progress across all five units, and jump straight back with **Continue studying**.
- **20 Prerequisite-Ordered Beginner Lessons (4 per unit):** Plain-English explanations, everyday analogies, key terms, worked examples, course diagrams, and comparison tables.
- **Practice Modes (All 90 Questions):** Quick **2-mark** recall, structured **5-mark** answer outlines, and timed **10-mark** exam practice — showing hints first and encouraging own-words recall instead of rote memorization.
- **13 Step-by-Step Numerical Drills:** Interactive calculations (Hex/Octal, BCD/Excess-3, 18-bit 2's complement, Addressing Modes, Signed-Magnitude Add/Sub, Sign-Magnitude Multiplication, Booth’s Algorithm with live register trace tables, and Cache AMAT).
- **Independent Arithmetic Verification:** All calculations were checked independently; four minor ambiguities or discrepancies in the source answer key are clearly labeled **“Check this answer”** with an explanation.
- **Calm Focus Timer:** Unobtrusive **25/5** and **40/10** minute study/break timer in the top bar.
- **“How much time do you have?” Session Builder:** Pick **10, 20, 40, or 60 minutes** to generate a calm study plan prioritizing missed questions and topics shared by 5- and 10-mark sections.
- **“Explain it more simply” & Mini-Glossary:** Every lesson includes a plain-language re-explanation with decoded jargon, a fresh analogy, and one-step-at-a-time calculation reveals, plus tappable glossary terms (42 COA concepts with examples).
- **Mark-Based Self-Check & Reading Comfort:** Self-check 2-, 5-, and 10-mark answers with calm missing-point suggestions, optional **Read this aloud** (browser Web Speech API), **Low-Distraction Focus View**, **Font-Size Controls** (`A / A+ / A++`), and **Calm Dark Theme**.
- **“Forgot This” Review List & High-Yield Checklist:** Retry missed questions anytime, prioritize the 18 topics repeated across 5- and 10-mark sections, or browse and search all 90 questions.
- **Offline-First + Optional Always-On Phone ↔ PC Sync:** Works 100% locally in `localStorage` with zero accounts. On Vercel, click **Sync** in the top bar, choose a private Sync Code once (or open the 1-tap auto-connect link `/?sync=<code>` on your other device), and completed lessons, quizzes, drafts, numericals, and checklists auto-sync and conflict-free merge across Phone & PC using Vercel Private Blob Storage (`@vercel/blob`).

## How to Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or newer) and npm.

1. Open a terminal in this project folder (`c:\Users\Shahid\Downloads\coa`):
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal (usually `http://localhost:5173`) in your browser.

### Optional: Production Build & Preview

```bash
npm run build
npm run start
```

## Optional: Gemini API Tutor (Server-Side Only)

The app works **100% offline without any API key**. If you want to enable the optional Gemini Flash tutor (`gemini-2.5-flash`):

1. Set `GEMINI_API_KEY` as a **server environment variable** in your terminal before starting the app (never place it in client/browser code or commit it to git — `.gitignore` ignores `.env*`):
   - **PowerShell (Windows):**
     ```powershell
     $env:GEMINI_API_KEY="your-gemini-api-key"
     npm run dev
     ```
   - **macOS / Linux:**
     ```bash
     export GEMINI_API_KEY="your-gemini-api-key"
     npm run dev
     ```
2. Open the app, click **AI Tutor** in the top bar (or open **View**), and switch **AI Tutor** to **On**.
3. The server-side endpoint (`/api/tutor`) reads `GEMINI_API_KEY` exclusively on the server, sends only the active topic and relevant excerpt from `COA_Answer_Key_SR25.docx`, enforces a gentle limit of **20 requests per 15 minutes**, and falls back cleanly to built-in lessons if no key is set.

