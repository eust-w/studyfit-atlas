<div align="center">
  <img src="docs/readme/hero.svg" width="100%" alt="StudyFit Atlas workflow overview">
  <h1>StudyFit Atlas</h1>
  <p><strong>Eight choices. Six destinations. A playful starting point.</strong></p>
  <p><a href="LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/License-Apache--2.0-d99536?style=flat-square"></a> <a href="docs/readme/validation.md"><img alt="Validation notes" src="https://img.shields.io/badge/Validation-repository%20checks-547ac4?style=flat-square"></a></p>
  <p><a href="#overview">Overview</a> · <a href="#quick-start">Quick start</a> · <a href="#workflow">Workflow</a> · <a href="#validation">Validation</a> · <a href="#documentation">Docs</a></p>
  <p><a href="README.md">English</a> · <a href="README.zh-CN.md">简体中文</a></p>
</div>

---

<a id="overview"></a>
## Overview

A browser-only study-preference quiz with deterministic weighted scores and a clear reset flow. It is a small, self-contained React example.

| Capability | What it provides |
| :--- | :--- |
| **Eight questions** | Classroom, pace, campus, communication and personal preferences. |
| **Six profiles** | Canada, UK, USA, Germany, Australia and the Netherlands. |
| **No backend** | The application runs entirely in the browser. |

### Local demo

![StudyFit Atlas local demonstration](docs/readme/result.jpg)

*Captured locally for this release; sample data, replay and fallback boundaries are stated below.*

<a id="quick-start"></a>
## Quick start

```bash
git clone https://github.com/eust-w/studyfit-atlas.git
cd studyfit-atlas
npm ci
npm run dev
# Open the local URL printed by Vite.
```

<a id="workflow"></a>
## Workflow

```text
ANSWER → COMPARE → EXPLORE
```

```bash
npm test -- --run
npm run build
npm run preview
```

<a id="validation"></a>
## Validation

```bash
npm test -- --run
npm run build
```

Recorded environment and executed checks: [validation notes](docs/readme/validation.md).

| Area | Current boundary |
| :--- | :--- |
| Score | The percentage is a game score, not an admission probability or a validated personality assessment. |
| Purpose | Self-reflection and planning inspiration; independently verify real study decisions. |

<a id="documentation"></a>
## Docs

- [Scoring model / 评分模型](src/quiz.ts)
- [Scoring tests / 评分测试](src/quiz.test.ts)
- [Interaction tests / 交互测试](src/App.test.tsx)

## License and provenance

Original code and newly created demo assets are licensed under [Apache-2.0](LICENSE). Dependencies, models, datasets and external resources retain their terms; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
