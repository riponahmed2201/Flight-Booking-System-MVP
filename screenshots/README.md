# Screenshots Guide

This folder should contain screenshots of the application for submission.

## Required Screenshots

### 1. Swagger Documentation (`swagger-ui.png`)
- Open http://localhost:3000/api/docs
- Take full-page screenshot showing all endpoints
- Should show: Auth, Flights, and Bookings sections

### 2. API Endpoints (`api-endpoints.png`)
- Expand one endpoint (e.g., POST /auth/register)
- Show request/response schemas
- Demonstrate the interactive "Try it out" feature

### 3. Authentication Flow (`auth-flow.png`)
- Show successful registration response
- Highlight the JWT token in response
- Show user object without password field

### 4. Error Handling (`error-handling.png`)
- Show different error responses:
  - 409 Conflict (duplicate email)
  - 401 Unauthorized (invalid credentials)
  - 400 Bad Request (validation error)
  - 429 Too Many Requests (rate limit)

### 5. Pagination Example (`pagination.png`)
- GET /flights with pagination parameters
- Show response with data and meta fields
- Demonstrate filtering (origin/destination)

### 6. Booking Creation (`booking-success.png`)
- POST /bookings with JWT token
- Show successful booking response
- Highlight totalPrice calculation

## How to Take Screenshots

1. **Start the application:**
   ```bash
   npm run start:dev
   ```

2. **Open Swagger UI:**
   ```
   http://localhost:3000/api/docs
   ```

3. **Use Swagger's "Try it out" feature** to test endpoints

4. **Capture screenshots** using:
   - Windows: Win + Shift + S
   - Mac: Cmd + Shift + 4
   - Or use browser's full-page screenshot extension

## Screenshot Tips

- Use **full-page screenshots** for Swagger UI
- **Highlight important parts** (error messages, response fields)
- Ensure **text is readable** (high resolution)
- Show **actual data** (not just schema)
- Include **timestamps** to prove it's working

## Folder Structure

```
screenshots/
├── swagger-ui.png
├── api-endpoints.png
├── auth-flow.png
├── error-handling.png
├── pagination.png
└── booking-success.png
```

Place all screenshots in this folder before submission.
