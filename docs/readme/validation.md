# Release validation

Date: 2026-10-14. Checks are executed in an isolated working checkout. Screenshots use local synthetic/demo data. A source implementation, a passing automated test and external-service acceptance are separate claims.

## Commands

```bash
npm test -- --run
npm run build
```

PASS: Vitest suite and build; browser completed all eight questions, displayed a result and reset to question one. Hardware, external credentials, signing and production deployment are separate setup/acceptance steps.
