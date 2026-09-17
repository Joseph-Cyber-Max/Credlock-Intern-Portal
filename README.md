# Credlock Africa SIWES Management & Learning Portal

A professional intern-management and learning platform for Credlock Africa, combining four connected layers:

1. **LMS** — 12-week SIWES curriculum, lessons, quizzes, practical exercises and progress.
2. **Smartphone Technical Support Lab** — simulated BNPL/device-support scenarios, troubleshooting, ticketing and engineering escalation.
3. **Cybersecurity Training** — customer-data protection, authentication, mobile threats, incident response and secure support practices.
4. **Management System** — attendance, projects, supervisor evaluation, performance analytics, notifications and reporting.

## Technology

- ASP.NET Core / Razor Pages
- C# / .NET 8
- Server-side session authentication foundation
- Responsive HTML/CSS UI
- GitHub Actions build validation

## Portal journey

`Login → Dashboard → Current Week → Training → Practical Exercise → Daily Assessment → Weekly Quiz → Supervisor Review → Weekly Evaluation → Improvement Plan → Projects → Monthly Evaluation → Final Capstone`

## 12-week programme

| Week | Focus |
|---|---|
| 1 | Credlock + Technical Support + Cybersecurity Orientation |
| 2 | Smartphone Hardware Fundamentals |
| 3 | Android Operating System |
| 4 | Smartphone Networking & Connectivity |
| 5 | Credlock App & Mobile Application Support |
| 6 | Device Enrollment & Device Management |
| 7 | Customer Data Security & Privacy |
| 8 | Mobile Cybersecurity & Incident Response |
| 9 | Troubleshooting, Logs & API Awareness |
| 10 | Ticketing & Engineering Escalation |
| 11 | Reporting, Analytics & Recurring Issues |
| 12 | Final Credlock Smartphone Incident Capstone |

## Core intern modules

- Dashboard
- Training Roadmap / Curriculum
- Daily Assessment
- Weekly Quizzes
- Technical Support Lab
- Projects and submissions
- Attendance
- Performance / My Progress
- Knowledge Base / SOPs
- Notifications
- Achievements

## Management modules

- Intern registration and SIWES records
- Supervisor management
- Question bank and quiz administration
- Curriculum management
- Learning/task upload review
- Project grading and feedback
- Supervisor evaluations
- Attendance reporting
- Weekly/monthly performance reporting
- Alerts and audit logging

## Security rules

The portal is designed around least privilege and server-side validation. Interns must only access their own records and must not change scores, supervisor assessments, management reports, official SOPs, administrative settings, production device-management settings, or security controls.

Operational training must teach **authorized diagnosis, evidence collection, documentation and escalation** rather than bypassing device-management or authentication controls.

## Scoring model

### Daily assessment — 100%

- Technical task — 10%
- Troubleshooting — 20%
- Root-cause reasoning — 15%
- Smartphone knowledge — 10%
- Cybersecurity awareness — 15%
- Documentation — 10%
- Escalation judgement — 5%
- Learning/reflection — 10%
- Professionalism — 5%

### Weekly evaluation

- Daily performance — 40%
- Weekly quiz — 25%
- Supervisor evaluation — 35%

### Performance bands

- 90–100 — Excellent
- 80–89 — Very Good
- 70–79 — Good
- 60–69 — Needs Improvement
- Below 60 — Critical Attention

## BNPL technical-support workflow

For a financed smartphone issue, the training workflow is:

`Customer verification → Device identification → Enrollment → Authentication → Connectivity → Synchronization → Application → System status → Evidence → Resolution/Escalation`

Typical scenarios include device locked, unlock request, app installation/removal, enrollment failure, authentication failure, synchronization problems, network issues, Android issues, payment/device-status discrepancies, merchant issues and API/application errors.

## Documentation

Detailed source-organized material is maintained in:

- `docs/12_WEEK_CURRICULUM.md`
- `docs/BNPL_SMARTPHONE_SUPPORT_PLAYBOOK.md`
- `docs/CYBERSECURITY_SUPPORT_FRAMEWORK.md`
- `docs/PORTAL_SPECIFICATION.md`

## Development

Open `CredlockInternPortal.sln` in Visual Studio Community, pull the latest `main` branch, restore packages, rebuild and run. GitHub Actions also validates the .NET 8 project on pushes and pull requests.
