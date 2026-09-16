# ADR-0007: Email and password authentication

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** Delivery App team

## Context

Three roles need to sign in: dispatchers (a handful of people), drivers (a small, semi-transient pool, often on a phone), and construction customers (one login per company, office-based).

There is **no self-signup**. Every account is created by a dispatcher, because every user belongs to a company or the dispatch team.

## Decision

Supabase Auth with **email as the username and a password**. Self-signup disabled. Accounts provisioned by dispatchers through the Supabase admin API.

## Consequences

### Positive

- No custom auth code. Session management, password hashing, reset flows, and JWT issuance are all handled by Supabase.
- Email as the identifier means no separate username→email mapping table and no custom sign-in flow. It also means password reset works out of the box, which a true username handle would complicate.
- Disabling self-signup means there is no path to an orphaned account with no valid `profiles` row.
- `profiles.active = false` gives immediate deactivation while preserving order history and audit integrity.

### Negative / trade-offs

- **Passwords are a support burden.** Expect reset requests, especially from drivers. This is the main cost of this decision over magic links.
- Drivers logging in on a phone will be signed out periodically and must re-enter credentials, possibly while standing in a store. This is a genuine usability cost.
- Drivers are semi-transient; offboarding is a manual dispatcher action.
- Credential handoff is out-of-band in the MVP (the dispatcher communicates the initial password), which is not a secure channel in general.

### Follow-ups worth considering

| Improvement | When it becomes worth it |
|---|---|
| Longer driver sessions / "stay signed in" | As soon as drivers complain about re-authentication mid-shift |
| Magic-link or OTP as an alternative sign-in | If password resets become a recurring support load |
| Forced password change on first login | Before onboarding customers outside the pilot |

## Alternatives considered

| Alternative | Why not |
|---|---|
| **Magic links (email OTP) for everyone** | No passwords to manage and every customer is already email-native. Rejected in favour of explicit passwords per team preference — but this remains the most likely future change |
| **True username handles** | Requires a username→email mapping table and a custom sign-in flow, and breaks Supabase's built-in password reset. More code for no MVP benefit |
| **Google SSO for internal, magic link for customers** | Fast for the dispatch team, but drivers are unlikely to have Workspace accounts, so it would mean maintaining two auth paths |
| **Magic link + optional password** | The best driver UX of the options, but two code paths to build and test from day one |

## Related

- [10-auth-and-permissions](../architecture/10-auth-and-permissions.md)
