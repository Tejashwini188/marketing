# CSP Matrimony — Site map

Two logins: **Admin** and **Users**.

## 1. Admin (login → dashboard)
- Number of users / active users
- Memberships
- Active memberships
- Grant access
- Premium members
- New users
- Old users
- Total users
- Permissions based on membership plans

## 2. Users
- a) Registration form with all personal details
- b) Personal dashboard — profile, photos, partner preferences
- c) Matches — new matches, today's matches, my matches, near me, more matches

## 3. Search
- Form containing the user's search preferences

## Proposed routes (draft — confirm as each page is designed)
| Area | Route |
|---|---|
| Public home | `/` |
| User login / register | `/login`, `/register` |
| User dashboard | `/dashboard` (profile, photos, partner preferences) |
| Matches | `/matches` (tabs: new, today, my matches, near me, more) |
| Search | `/search` |
| Admin login | `/admin/login` |
| Admin dashboard | `/admin` (stats, memberships, grant access, permissions) |


## Built (2026-11-23)

Public (anyone): `/` Home · `/success-stories` · `/contact` · `/login` · `/register`
Members only (after register / login): `/dashboard` · `/matches?tab=new|today|my|near|all` · `/matches/[id]` · `/search`

No About or Membership pages. Admin area not built yet.
Member data (accounts, sessions, photos) is kept locally in `.data/` (git-ignored).
