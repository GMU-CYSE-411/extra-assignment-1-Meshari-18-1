# CYSE 411 Extra Assignment - Advanced Security Review

This repository is an intentionally vulnerable web application for advanced secure code review practice in CYSE 411.

The assignment scope is intentionally limited to concepts covered in the provided Unit 2 materials:

- Trust boundaries between client and server
- Injection as a failure to separate data from instructions
- XSS through unsafe DOM rendering
- CSRF as abuse of browser automatic behavior
- Authentication and session misuse
- Authorization failures caused by missing server-side enforcement
- Business logic abuse caused by over-trusting client input

Do not introduce unrelated vulnerability classes when you repair this code. The goal is to identify the flaws that are already present, understand how they compose, and apply the most appropriate fix in context.

## This is a non-compulsory activity. Students can earn up to 20 points that may be applied to the Midterm Exam.

## Learning Goal

Unlike earlier assignments, this one is designed to look more like a real review:

- Multiple weaknesses appear in the same workflow
- Some issues are easy to label but harder to fix correctly
- Some routes contain more than one problem
- The best repair is not always "add one filter"

Students should be able to move beyond category matching and explain how trust assumptions fail across the browser, server, session layer, and database.

## Application Overview

The starter app is a small note-sharing system with:

- `login`
- `notes`
- `settings`
- `admin`

The implementation is intentionally unsafe. Seed data and route behavior are designed so students can inspect code, reproduce issues locally, and then submit a secure revision.

## Repository Layout

- `server.js`: application entry point
- `db.js`: SQLite helpers
- `init-db.js`: database initialization and seed data
- `server/`: app and route logic
- `public/`: HTML, CSS, and browser-side JavaScript

## Setup

```bash
npm install
npm run init-db
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Seed Accounts

These accounts are intentionally weak because the assignment includes authentication misuse review:

- `admin / admin123`
- `alice / wonderland`
- `bob / builder`

## Student Tasks

1. Review the application and identify all in-scope vulnerabilities.
2. Determine how each issue can be abused and where trust boundaries fail.
3. Repair the application using techniques that match the course material.
4. Eliminate all in-scope weaknesses present in the starter code.
5. Update or add tests if needed so your secure behavior is demonstrated.
6. Commit your code changes to your GitHub Classroom repository.

## Submission Model

Students submit their modified repository files through GitHub Classroom.

Grading will be based on the submitted code itself. The instructor will review the implementation locally and evaluate whether the application behavior shows that the in-scope vulnerabilities were properly eliminated.

## Grading Rubric

This extra assignment is worth up to 20 points.

| Type | Description | Points |
| --- | --- | --- |
| Injection | Correctly eliminates injection-related weaknesses within the assignment scope, including failures to separate data from instructions and unsafe handling across trust boundaries. | 5 points |
| XSS | Correctly eliminates XSS weaknesses caused by unsafe browser-side rendering and replaces unsafe rendering behavior with an appropriate secure approach. | 4 points |
| CSRF | Correctly eliminates CSRF weaknesses in state-changing workflows using defenses that match the course material. | 4 points |
| Authentication and Session Misuse | Correctly fixes authentication and session misuse issues, including insecure login and session handling behavior. | 3 points |
| Authorization and Server-Side Enforcement | Correctly fixes authorization and server-side enforcement issues so that protected actions and data are validated on the server. | 3 points |
| Code Quality and Completeness | Fixes are coherent, aligned with the assignment scope, and do not rely on superficial or incomplete patches. | 1 point |

Partial credit may be awarded when a student identifies the correct problem area but does not fully eliminate the weakness in code.


## What Counts As A Good Fix

The slides support the following kinds of repairs:

- Parameterization for SQL queries
- Safe rendering instead of unsafe DOM sinks such as `innerHTML`
- Output handling that respects browser parsing context
- CSRF defenses such as tokens, origin validation, and safer cookie policy
- Session regeneration after login and stronger cookie handling
- Explicit authorization checks on the server
- Deriving sensitive values from the server-side session instead of trusting client-submitted identifiers

Partial mitigations and superficial patches may not receive full credit. Fixes should address the root cause of the weakness in the relevant workflow.

## Secure Review Expectations

You are not being graded only on category labels. A high-quality solution should reflect questions like:

- What boundary was crossed?
- Which side of the system was trusted incorrectly?
- Was the flaw caused by a dangerous API, missing authorization, or an unsafe workflow assumption?
- If two problems interact, which repair should happen first?

## Optional Stretch Challenges

These are optional and may require extra reading beyond the core classroom material:

- Improve the quality of your exploit explanations so they cover chained abuse, not isolated bugs.
- Strengthen your fixes with layered defenses after you implement the primary repair.

Tip:
Start with the root cause, not the payload. The same unsafe trust decision often appears in more than one route.

Additional reading:

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [OWASP XSS Overview](https://owasp.org/www-community/attacks/xss/)
