# Credlock Africa Intern Management Portal — Implementation Roadmap

## Current baseline
- Next.js App Router + TypeScript
- Prisma/PostgreSQL
- Existing cookie session authentication
- Existing dashboard, attendance, tasks, learning and API foundations

## Active branch
feature/portal-foundation

## Phase 1 — Foundation
1. Expand the Prisma domain model without destroying existing data.
2. Add programme, school, department and supervisor entities.
3. Add structured 12-week curriculum content from the approved internship programme.
4. Add intern lifecycle/status and programme assignment.
5. Strengthen server-side authorization and audit logging.
6. Replace hardcoded dashboard values with persisted calculations.

## Phase 2 — Intern Operations
- Intern directory and profiles
- Attendance
- Tasks and assignments
- Daily learning/activity logs
- Weekly reports and supervisor review
- Notifications

## Phase 3 — Learning & Assessment
- 12-week modules and objectives
- Friday weekly quizzes
- Question bank
- Quiz attempts/scoring
- Skills tracking
- Training records

## Phase 4 — Performance
- Daily scoring
- Weekly scoring
- Monthly evaluation
- Competency pillars
- RED/AMBER/GREEN/EXCELLENT flags
- Performance history

## Phase 5 — Projects & Completion
- Practical projects
- Milestones and submissions
- Supervisor/project reviews
- Week 12 capstone
- Final competency assessment
- Certificate generation and verification

## Phase 6 — Governance
- Documents
- Leave
- Issues/incidents
- Knowledge base
- SOPs
- Announcements
- Reports/export
- Audit trail
- Security review

## Engineering rule
Implement against the existing codebase. Preserve working functionality, avoid destructive migrations, validate authorization server-side, and verify every completed feature before claiming it is done.
