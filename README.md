# Homework-11-Bookmark-Publisher

## Notes

### Route List

#### Public Routes
- GET /
- GET /bookmarks
- GET /bookmarks/:slug
- GET /tag/:tagSlug
- GET /search?q=...

#### Admin Routes
- GET /login
- POST /login
- POST /logout
- GET /
- GET /bookmarks
- GET /bookmarks/new
- POST /bookmarks/new
- GET /bookmarks/:slug/edit
- POST /bookmarks/:slug/edit
- POST /bookmarks/:slug/delete
- POST /bookmarks/:slug/archive
- POST /bookmarks/:slug/unarchive

### Sample Credentials
- username: admin
- password: password123

### Middleware Order
The app uses global middleware first: logger, body parsers, session, and static files.
Then vhost separates public and admin traffic.
For admin routes, login routes are public first, then `adminAuth` protects all remaining admin routes.
Validation middleware runs before creating or editing bookmarks.