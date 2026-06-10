# StudyFit Atlas Design

## Product

StudyFit Atlas is a browser quiz game that maps a student's personality and study preferences to a suggested university destination country. The experience is MBTI-like, but framed as entertainment and self-reflection rather than admissions advice.

## Recommended Approach

Build a static React app with a deterministic scoring engine.

- Option A: static React app. Fast to ship, easy to host on GitHub Pages or Vercel, no backend risk. Recommended.
- Option B: full-stack app with saved results. More extensible, but adds auth, storage, and privacy decisions that are unnecessary for the first version.
- Option C: no-code quiz page. Fastest, but poor ownership and less flexible scoring.

## Architecture

The app has one pure quiz model and one React UI layer.

- `src/quiz.ts` owns questions, country profiles, answer weights, result calculation, and tie breaking.
- `src/App.tsx` owns the interactive quiz flow: intro, questions, progress, result, restart.
- `src/App.css` owns the visual system and responsive layout.
- Tests cover the scoring engine and basic UI rendering.

## UI

The first screen is the actual quiz launcher, not a marketing landing page. The layout uses a compact game interface: left side context and progress, right side question choices on desktop; single-column flow on mobile.

The tone is polished but playful: clear country badges, trait bars, practical "why this fits" explanations, and a small disclaimer that results are for exploration only.

## Scoring

Each answer contributes points to six destination profiles:

- Canada: balanced, safe, collaborative, immigration-friendly
- United Kingdom: tradition, debate, humanities, fast-paced academic focus
- United States: ambitious, flexible, entrepreneurial, broad campus choice
- Germany: structured, engineering, independence, cost-conscious study
- Australia: outdoors, applied learning, social lifestyle, warm climate
- Netherlands: direct communication, international classrooms, design and social impact

The highest score wins. Ties use a stable profile order so repeated results are deterministic.

## Testing

Use Vitest for the scoring engine and React Testing Library for UI smoke tests. The minimum acceptance bar is:

- scoring returns the expected strongest country for representative answer sets
- tie handling is deterministic
- the app renders the quiz title and first question
- production build succeeds
