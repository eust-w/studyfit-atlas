# StudyFit Atlas Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a playable MBTI-like study-abroad personality quiz that recommends a destination country for university study.

**Architecture:** Static React app with a pure TypeScript scoring engine and a responsive single-page UI. The quiz model is tested independently from the React layer.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, lucide-react.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/App.css`
- Create: `src/index.css`
- Create: `tsconfig.json`
- Create: `vite.config.ts`

**Steps:**
1. Create the Vite React TypeScript baseline.
2. Install dependencies with `npm install`.
3. Commit the scaffold.

### Task 2: Quiz Engine TDD

**Files:**
- Test: `src/quiz.test.ts`
- Create: `src/quiz.ts`

**Steps:**
1. Write failing tests for destination scoring, deterministic ties, and result descriptions.
2. Run `npm test -- --run src/quiz.test.ts` and verify failure.
3. Implement the minimal quiz engine in `src/quiz.ts`.
4. Run the same test and verify pass.
5. Commit the quiz engine.

### Task 3: UI TDD And Implementation

**Files:**
- Test: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.css`
- Modify: `src/index.css`

**Steps:**
1. Write a failing UI smoke test for the title and first question.
2. Run `npm test -- --run src/App.test.tsx` and verify failure.
3. Implement the quiz flow, answer selection, result view, and restart.
4. Run the UI test and verify pass.
5. Commit the UI.

### Task 4: Verification And Publish

**Files:**
- Modify: `README.md`

**Steps:**
1. Write README usage and project description.
2. Run `npm test -- --run`.
3. Run `npm run build`.
4. Review `git diff`.
5. Commit final docs and push to GitHub.
